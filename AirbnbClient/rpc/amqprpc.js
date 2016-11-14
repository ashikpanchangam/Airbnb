var amqp = require('amqp')
  , crypto = require('crypto');
 
var TIMEOUT=8000;                                                           /*The time to wait for response (in milliseconds)*/
var CONTENT_TYPE='application/json';
var CONTENT_ENCODING='utf-8';
var self;
 
exports = module.exports = AmqpRpc;
 
function AmqpRpc(connection){
  self = this;
  this.connection = connection; 
  this.requests = {};                                                       /*A hash to store request in wait for response*/
  this.response_queue = false;                                              /*A placeholder for the future queue*/
}

AmqpRpc.prototype.makeRequest = function(queue_name, content, callback){
	
  self = this;

  var correlationId = crypto.randomBytes(16).toString('hex');               /*generate a unique correlation id for this call*/

  var tId = setTimeout(function(corr_id){                                   /*creates a timeout for what should happen if we don't
                                                                            get a response*/
    callback(new Error("timeout " + corr_id));                              /*if this ever gets called we didn't get a response
                                                                            in a timely fashion*/
    delete self.requests[corr_id];                                          /*delete the entry from hash*/
  }, TIMEOUT, correlationId);

  var entry = {                                                             /*create a request entry to store in a hash*/
    callback:callback,
    timeout: tId                                                            /*the id for the timeout so we can clear it*/
  };

  self.requests[correlationId]=entry;                                       /*put the entry in the hash so we can match the
                                                                            response later*/
  self.setupResponseQueue(function(){                                       /*make sure we have a response queue*/

  self.connection.publish(queue_name, content, {                            /*put the request on a queue*/
      correlationId:correlationId,
      contentType:CONTENT_TYPE,
      contentEncoding:CONTENT_ENCODING,
      replyTo:self.response_queue});
  });
};
 
 
AmqpRpc.prototype.setupResponseQueue = function(next){
  if(this.response_queue) return next();                                    /*don't mess around if we have a queue*/

  self = this;                                                              /*create the queue*/
  self.connection.queue('', {exclusive:true}, function(q){
  self.response_queue = q.name;                                             /*store the name*/

  q.subscribe(function(message, headers, deliveryInfo, m){                  /*subscribe to messages*/
  var correlationId = m.correlationId;                                      /*get the correlationId*/
  if(correlationId in self.requests)                                        /*is it a response to a pending request*/
  {
        var entry = self.requests[correlationId];                           /*retrieve the request entry*/
        clearTimeout(entry.timeout);                                        /*make sure we don't timeout by clearing it*/
        delete self.requests[correlationId];                                /*delete the entry from hash*/
        entry.callback(null, message);                                      /*callback, no err*/
  }
  });
    return next();
  });
};
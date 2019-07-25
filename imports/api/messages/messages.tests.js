import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
 
import { Messages } from './messages.js';
import { assert } from 'chai';


if(Meteor.isServer){
    describe('Messages', () => {
        describe('methods', () => {
            const userId = Random.userId();
            let messageId;
            beforeEach(()=>{
                Messages.remove({});
                messageId = Messages.insert({
                    message : 'test message',
                    createdAt : new Date(),
                    owner : userId,
                    username: 'Belle',
                });
            })
            it('can delete owned task',()=>{

            });
        });
    });
}
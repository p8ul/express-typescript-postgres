import { WebClient } from '@slack/client';
import * as dotenv from 'dotenv';

dotenv.config();

const { SLACK_TOKEN } = process.env;
export const slackClient = new WebClient(SLACK_TOKEN);

const conversationId = 'GKE3HKHRD';

export const postMessage = async (message: string) => {
    try {
        const res = await slackClient.chat.postMessage({channel: conversationId, text: message});
        console.log('Message sent: ', res);
        return res; 
    } catch (error) {
        console.error(error);
    }
    
}

export const createChannel = async () => {
    const res = await slackClient.groups.create({ name: 'newChannel' });
    console.log('Channel Created: ', res);
    return res;
}
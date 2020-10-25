import Router from 'next/router';
import { NextPageContext } from 'next';

export default async (context: any, target: string): Promise<any> => {
    if (context.res) {
        // server
        context.res.writeHead(303, { Location: target });
        context.res.end();
    } else {
        // In the browser, we just pretend like this never even happened ;)
        try {
            await Router.replace(target);
        } catch (error) {
            console.error(error);
        }
    }
};

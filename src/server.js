import React from 'react';
import ReactDomServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import Template from './template';
import moduleName from 'module';
import App from './App/App';

export default function serverRender(){
    return (req,res) => {
        const context ={};
        const markup = ReactDomServer.renderToString(
            <StaticRouter location={req.url} context={context}>
                <App/>
            </StaticRouter>
        )

        const helmet = Helmet.renderStatic();
        res.status(200).send(Template({markup: markup,helmet: helme}))
    }
}
/*
import {graphql} from 'graphql';

import { schema, rootValue } from './schema';

const executeGraphQLRequest = async request => {
    const resp = await graphql(schema, request, rootValue);
    console.log(resp.data);
};

executeGraphQLRequest(process.argv[2]);
*/

/*
    - Express라는 패키지를 사용해서 일반 HTTP 서버를 만들고, express-graphql이라는 패키지를 사용해서 그 서버를 GraphQL 서비스로 연결
*/

import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/index_v2.js';  // schema만 import

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import * as config from '../../../../graphql_study/graphql-in-action/api/src/config';

async function main() {
    const server = express();

    server.use(cors());
    server.use(morgan('dev'));
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use('/:fav.ico', (req, res) => res.sendStatus(204));

    // rootValue 제거하고 schema만 전달
    server.use(
        '/',
        graphqlHTTP({
            schema,          // schema만 있으면 충분
            graphiql: true,  // GraphiQL IDE 활성화 (브라우저에서 테스트 편함)
        })
    );

    server.listen(config.port, () => {
        console.log(`Server URL: http://localhost:${config.port}/`);
    });
}

main();
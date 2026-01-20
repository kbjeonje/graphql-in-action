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

// GraphQL 요청을 HTTP 요청 형태로 처리하기 위한 공식 미들웨어 패키지
import { graphqlHTTP } from 'express-graphql';
import { schema, rootValue } from './schema/index_v1.js';

//Node.js 웹 서버 프레임워크. HTTP 요청 처리, 라우팅, 미들웨어 등록
import express from 'express';
// HTTP 요청 본문(body)을 JSON 또는 urlencoded 형식으로 파싱해
// req.body로 변환해주는 미들웨어
import bodyParser from 'body-parser';
// CORS 허용 미들웨어
import cors from 'cors';
// http 요청 로그 전용 미들웨어
import morgan from 'morgan';

import * as config from '../../../../graphql_study/graphql-in-action/api/src/config';

// Express 애플리케이션 인스턴스를 생성
async function main() {
    const server = express();


    server.use(cors());
    server.use(morgan('dev'));
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use('/:fav.ico', (req, res) => res.sendStatus(204));

    // 루트 경로(/)로 들어오는 GET/POST 등
    // 모든 요청에 대해 “Hello World” 문자열을 응답
    /*
    server.use('/', (req, res) => {
      res.send('Hello World');
    });
    */

    // HTTP 요청이 ‘/’ 로 들어오면 항상 GraphQL 요청 처리기로 전달
    server.use(
        '/',
        graphqlHTTP({
            schema,
            rootValue,
            graphiql:true,
        })
    );

    // 서버 기동
    server.listen(config.port, () => {
        console.log(`Server URL: http://localhost:${config.port}/`);
    });
}

//모든 초기화 과정(미들웨어 등록 → 라우팅 → 서버 기동)을 수행
main();
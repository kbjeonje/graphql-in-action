import {
    //전체 스키마 객체 생성
    // GraphQL에서 전체 API의 스키마 정의를 담당하는 최상위 객체
    GraphQLSchema,
    GraphQLObjectType, //Query, Mutation 타입 구성
    GraphQLString, //필드 타입 지정
    GraphQLInt, // 숫자 타입 지정
    GraphQLNonNull, //“필수 필드” 를 의미하는 래퍼 타입
} from 'graphql';

const QueryType = new GraphQLObjectType({
    name : "Query",
    fields : {
        currentTime : {
            type : GraphQLString,
            resolve : () => {
                const isoString = new Date().toISOString();
                return isoString.slice(11, 19);
            },
        },
        sumNumbersInRange:{
            type: new GraphQLNonNull(GraphQLInt),
            args : {
                begin : {type: new GraphQLNonNull(GraphQLInt)},
                end : {type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve: function(source, {begin, end}){
                let sum = 0;
                for(let i = begin; i <= end; i++){
                    sum += i;
                }
                return sum;
            },
        },
    },
});

export const schema = new GraphQLSchema({
    query: QueryType,
});
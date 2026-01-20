import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull, GraphQLString,
} from 'graphql';
import NumbersInRange from "./types/numbers-in-range";
import { numbersInRangeObject } from "../../../../../graphql_study/graphql-in-action/api/src/utils";

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
        numbersInRange : {
            type : NumbersInRange,
            args : {
                begin: { type: new GraphQLNonNull(GraphQLInt) },
                end: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: function (source, { begin, end }) {
                return numbersInRangeObject (begin, end);
            },

        }
    },
});

export const schema = new GraphQLSchema({
    query: QueryType,
});

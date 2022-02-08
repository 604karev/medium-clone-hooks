import { parse } from "query-string";

export const range = (start, end) => {
    return [...Array(end).keys()].map(item => item + start)
}

export const limit = 10;

export const getPaginator = search => {
    const parsedPage = parse(search)
    const currentPage = parsedPage.page ? Number(parsedPage.page) : 1
    const offset = currentPage * 10 - limit;
    return { currentPage, offset }
}
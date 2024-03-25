export default function Pagination(props: { count: any; perPage: any; currentPage: any; nextPage: any}) {

    const {count, perPage, currentPage, nextPage} = props;

    const paginationLinks = () => {
        let content = [];
        const pages = Math.ceil(count / perPage);

        for (let page = 1; page <= pages; page++) {
            content.push(
                <li key={page} className={page === currentPage ? 'active' : ''}>
                    <a
                        onClick={(e) => {
                            nextPage(page);
                        }}
                        // @ts-ignore
                        disabled={page === currentPage}
                    >{page}</a>
                </li>
            )
        }

        return content.length > 1 ? content : <></>
    }

    return <ul className="pagination">
        {paginationLinks()}
    </ul>
}
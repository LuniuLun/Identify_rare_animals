import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function Pagination({ currentPage, totalPages, setCurrentPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    const handlePageChange = (e) => {
        setCurrentPage(e.target.value);
    };

    const handleShowPreviousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(totalPages);
        }
    };

    const handleShowNextPage = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(1);
        }
    };

    return (
        <div className={cx("wrapper")}>
            <FontAwesomeIcon icon={faChevronLeft} className={cx("icon")} onClick={handleShowPreviousPage} />
            <ul className={cx("pagination")}>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={cx({ active: currentPage === number })}
                        onClick={(e) => {
                            handlePageChange(e);
                        }}
                        value={number}
                    >
                        {number}
                    </li>
                ))}
            </ul>
            <FontAwesomeIcon icon={faChevronRight} className={cx("icon")} onClick={handleShowNextPage} />
        </div>
    );
}

export default Pagination;

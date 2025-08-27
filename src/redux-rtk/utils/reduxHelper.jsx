// *append new data to paginated list
export const appendNewDataToPaginatedList = ({ newItem, meta, data, dataList }) => {

    const { pageSize, totalPages, currentPage } = meta;
    const lastPageKey = `page${totalPages}`;
    const lastPageData = data[lastPageKey] || [];

    const updatedData = { ...data };
    let updatedMeta = { ...meta };
    let updatedDataList = dataList;

    if (lastPageData.length < pageSize) {
        updatedData[lastPageKey] = [...lastPageData, newItem];
    } else {
        const newPageKey = `page${totalPages + 1}`;
        updatedData[newPageKey] = [newItem];
        updatedMeta.totalPages += 1;
    }

    updatedMeta.totalItems += 1;

    if (updatedMeta.totalPages === currentPage) {
        const currentPageKey = `page${currentPage}`;
        updatedDataList = updatedData[currentPageKey];
    }

    return {
        meta: updatedMeta,
        data: updatedData,
        dataList: updatedDataList,
    };
};

// *Set Paginated Data From API
export const setPaginatedDataFromApi = ({ incomingData, incomingMeta, existingData, existingMeta }) => {
    if (incomingMeta?.totalPages === 0) {
        return {
            meta: existingMeta,
            data: existingData,
            dataList: [],
        };
    }

    const updatedData = { ...existingData };
    const updatedMeta = { ...existingMeta, ...incomingMeta };
    let updatedDataList = [];

    if (incomingMeta.currentPage <= incomingMeta.totalPages) {
        const pageKey = `page${incomingMeta.currentPage}`;
        updatedData[pageKey] = incomingData;
        updatedDataList = incomingData;
    } else {
        const fallbackPageKey = `page${existingMeta.currentPage}`;
        const fallbackData = existingData[fallbackPageKey] || [];
        const slicedData = fallbackData.slice(0, incomingMeta.pageSize);

        const diff = incomingMeta.currentPage - incomingMeta.totalPages;
        const newCurrentPage = incomingMeta.currentPage - diff;

        updatedMeta.currentPage = newCurrentPage;
        updatedMeta.totalPages = incomingMeta.totalPages;
        updatedDataList = slicedData;
    }

    return {
        meta: updatedMeta,
        data: updatedData,
        dataList: updatedDataList,
    };
};

// *remove data from paginated list
export const removeDataFromPaginatedList = ({ idToRemove, meta, data }) => {
    const { pageSize, totalPages, currentPage } = meta;
    const updatedData = {};
    let updatedDataList = [];
    let items = [];

    // Flatten all pages into a single array
    for (let i = 1; i <= totalPages; i++) {
        const pageKey = `page${i}`;
        if (data[pageKey]) {
            items = items.concat(data[pageKey]);
        }
    }

    // Remove the item
    items = items.filter(item => item._id !== idToRemove);

    // Rebuild paginated data
    const newTotalItems = items.length;
    const newTotalPages = Math.max(1, Math.ceil(newTotalItems / pageSize));

    for (let i = 0; i < newTotalPages; i++) {
        const pageKey = `page${i + 1}`;
        updatedData[pageKey] = items.slice(i * pageSize, (i + 1) * pageSize);
    }

    // Update meta
    const updatedMeta = {
        ...meta,
        totalItems: newTotalItems,
        totalPages: newTotalPages,
    };

    // Update dataList (current page list)
    const currentPageKey = `page${Math.min(currentPage, newTotalPages)}`;
    updatedDataList = updatedData[currentPageKey] || [];

    return {
        meta: updatedMeta,
        data: updatedData,
        dataList: updatedDataList,
    };
};

// *update data only in dataList 
export const updateDataInDataList = ({ updatedItem, dataList }) => {
    return dataList.map(item =>
        item._id === updatedItem._id ? { ...item, ...updatedItem } : item
    );
};

// *update item in all pages of paginated data
export const updateDataInPaginatedPages = ({ updatedItem, data, meta }) => {
    const { totalPages } = meta;
    const updatedData = {};

    for (let i = 1; i <= totalPages; i++) {
        const pageKey = `page${i}`;
        if (data[pageKey]) {
            updatedData[pageKey] = data[pageKey].map(item =>
                item._id === updatedItem._id ? { ...item, ...updatedItem } : item
            );
        }
    }

    return updatedData;
};

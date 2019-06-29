export const Add_Data = (data) => {
    return {
        type : 'Add_Data',
        payload : data
    }
}
export const Change_Color = (props,id) => {
    return {
        type : 'Change_Color',
        payload : {
            work : props,
            id : id
        }
    }
}

const endpoints ={
    

    getAll :(page)=>{
            return {

                url : `/blog/?page=${page}`
            }
                
                    },
    getOnePost :(id,user_Id)=>{
        return {

            url : `/blog/${id}`
        }
            
                },
    deleteOnePost :(id,user_id)=>{
        return {

            url : `/blog/deleteBlog/${id}/?user_Id=${user_id}`,
            options:{
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            }
        }
            
                },
                addOnePost:(dataToSend ,user_id)=>{
                    return {
                        url : `/blog/?User_Id=${user_id}`,
                        options:{
                            method: 'POST',
                            body: JSON.stringify(dataToSend),
                            headers: {'Content-Type': 'application/json'},
                        }
                    }

                },
                updatepost:(id,updatedataToSend ,user_id)=>{
                    return {
                        url : `/blog/updateBlog/${id}/?user_Id=${user_id}`,
                        options:{
                            method: 'PUT',
                            body: JSON.stringify(updatedataToSend),
                            headers: {'Content-Type': 'application/json'},
                        }
                    }

                },
}

export default endpoints;
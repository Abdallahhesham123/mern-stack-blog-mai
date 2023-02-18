import endpoint from "./endpoint"
const {getAll,getOnePost,deleteOnePost,addOnePost ,updatepost}= endpoint;
const requests = {
  getAll: async (page) => {
    const {url} = getAll(page);
    const response = await fetch(url);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  getOnePost: async (id ) => {
    const {url} = getOnePost(id );
    const response = await fetch(url);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  deleteOnePost: async (id,user_id) => {
    const {url,options} = deleteOnePost(id,user_id);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  addOnePost: async(dataToSend ,user_id)=>{
    const {url,options} = addOnePost(dataToSend ,user_id);
    const response = await fetch(url,options);
    const data = await response.json();
    return new Promise((resolve, reject) => {
      data ? resolve({

        response: response,
        data : data
      })
       :
      
      reject(new Error("undefined"));
    });
  },
  updatepost:async(id , updatedataToSend ,user_id)=>{
    const {url,options} = updatepost(id , updatedataToSend ,user_id);
    const response = await fetch(url,options);
    const data = await response.json();
    return new Promise((resolve, reject) => {
      data ? resolve({

        response: response,
        data : data
      })
       :
      
      reject(new Error("undefined"));
    });
  },
};
export default requests;

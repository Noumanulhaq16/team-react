  import axios from "axios"
  import { useHistory } from "react-router"

  export const postApi = async (url, data) => {
      console.log(url, data)
      try {
        const response = await axios.post(url, data, {
          method:'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            // Authorization:"data.token"
          }
        })
        console.log(response, "response")
        if (response.status === 200) {
          return Promise.resolve({
            status: 'success',
            data: response.data
          })
        }
      } catch (e) {
        return Promise.reject(e)
      }
    }

    

    export const getApi = async (url, data) => {
      console.log(url, data)
      try {
        const response = await axios.get(url, data, {
          method:'GET',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            // Authorization:"data.token"
          }
        })
        console.log(response, "response")
        if (response.status === 200) {
          return Promise.resolve({
            status: 'success',
            data: response.data
          })
        }
      } catch (e) {
        return Promise.reject(e)
      }
    }

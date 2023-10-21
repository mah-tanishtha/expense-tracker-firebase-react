export const useGetUserInfo = ()=>{

    if(localStorage.getItem("auth") !== null){
        
        const authdata = JSON.parse(
            localStorage.getItem("auth")
        );

        return authdata;

    }

    return {username:"", profilePhoto: "", userId:"", isAuth: false}

    
};

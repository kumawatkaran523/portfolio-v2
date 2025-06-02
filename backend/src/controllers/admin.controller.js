const loginUser=(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    if(!username || !password){
        return res.json(
            message="both field is required"
        )
    }
    
} 
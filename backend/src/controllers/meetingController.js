
export const createMeetingId = (req,res)=>{
    try {
        const {name} = req.body

        if (!name){
            return res.status(400).json({
                message: "Please enter your name"
            });
        }

        
        const meetingId = Math.random().toString(36).substring(2, 10);

         res.status(201).json({
            meetingId,
            hostName: name,
        });


        
    } catch (error) {
        console.log(error);  
        res.status(500).json({
            message:"Erron in generating Id"
        })
    }
}
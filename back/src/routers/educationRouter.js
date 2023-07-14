import { Router } from "express";
import { Education } from "../db/models/Education";
import { educationService } from "../services/educationService";
import { login_required } from "../middlewares/login_required";

const educationRouter = Router();

// CRUD: CREATE
// 프론트엔드로부터 전달받은 학력사항 입력값을 새로운 학력정보 document로 데이터베이스에 저장합니다.
educationRouter.post("/:user_id/education", login_required, async(req, res)=>{ 
    const newEduData = req.body;

    // 라우트 매개변수인 user_id를 새로운 JSON 항목인 "userId: user_id"로 만들어 newEduData 객체에 추가해줍니다.
    newEduData["userId"] = req.params.user_id;

    // Education 모델의 create() 메소드를 사용해서 document를 생성합니다.
    const newEducation = await Education.create({ newEduData });
    
    if(Education.error){
        throw new Error(Education.error);
    }
    console.log(newEducation)
    res.status(200).json(newEducation);
    return;

});


// CRUD: READ
// 프론트엔드로부터 전달받은 userId를 사용해서 해당 사용자의 학력정보 document를 데이터베이스에서 가져옵니다.
educationRouter.get("/:user_id/education", login_required, async(req, res)=>{  
    const userId = req.params.user_id;
    const foundEducation = await Education.findEducationByUserId({ userId });

    if(Education.error){
        throw new Error(Education.error);
    }
    
    res.status(200).json(foundEducation);
    return;
});


// CRUD: READ
// 프론트엔드로부터 전달받은 eduId를 사용해서 해당 학력정보 document를 데이터베이스에서 가져옵니다.
educationRouter.get("/education/:edu_id", login_required, async(req, res)=>{  

    const eduId = req.params.edu_id;
    const foundEducation = await Education.findEducationByEduId({ eduId });

    if(Education.error){
        throw new Error(Education.error);
    }
    
    res.status(200).json(foundEducation);
    return;
});


// CRUD: UPDATE
// 프론트엔드로부터 전달받은 최신 학력사항 입력값으로 기존 학력정보 document를 최신화합니다.
educationRouter.put("/education/:edu_id", login_required, async(req, res)=>{  

    const updatedEduData = req.body;
    const eduId = req.params.edu_id;

    // Education 모델의 update() 메소드를 사용해서 document를 생성합니다.
    const updatedEducation = await Education.update({ eduId }, { updatedEduData });

    // eduId에 해당하는 document를 찾을 수 없는 경우에는, 에러를 반환하지 않고 정상처리 해버리는 현상이 있습니다.
    // 예외처리 추가가 필요합니다.
    
    if(Education.error){
        throw new Error(Education.error);
    }
    
    res.status(200).json(updatedEducation);
    return;
});


// CRUD: DELETE
// 프론트엔드로부터 전달받은 eduId를 사용해서 학력정보 document를 찾아서 삭제합니다.
educationRouter.delete("/education/:edu_id", async(req, res)=>{  

    const eduId = req.params.edu_id;
    const deletedEducation = await Education.delete({ eduId });
    
    if(Education.error){
        throw new Error(Education.error);
    }

    res.status(200)
    return;

});

export { educationRouter };

import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {Award} from "../db/models/Award"
// import {CertificateModel} from "../schemas/certification"
const awardRouter = Router();
const mongoose = require('mongoose');

// Create
awardRouter.put("/:userId/award/register",login_required,async (req, res)=> {
  //이때의 id는 유저의 id입니다. (_id 아님)
  // _id는 자동으로 생성됩니다.
  try {
      const userId=req.params.userId;
      const newAward=await Award.create({
        userId:userId,
        title:req.body.title,
        issuer:req.body.issuer,
        awardDate:req.body.awardDate,
        description:req.body.description
      })
      const savedAward = await newAward.save();
      res.send({success:true});
    }
    catch (error) {
    res.status(500).json({ error: error.message });
  }
  // 전달 완료!
}
);

//Read
awardRouter.get("/user/:userId/awards",
    async function (req, res) {
      try{
        const userId=req.params.userId;
        //이때의 id는 유저의 id입니다. 잘 불러와질지...
        const awardList=await Award.findById({userId})

        // id를 기반으로 사용자의 자격증 목록을 불러오고자 함
        res.status(200).json(awardList)
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
)

// 에러는 아니지만 값이 변하지 않고 updatedAt 시간만 바뀌는 Update 부분
awardRouter.put("/awards/edit/:awardDocId",login_required,async(req,res)=>{
  const awardDocId=req.params.awardDocId;
  const updateData=req.body;

  const updateAward=await Award.updateOne(
    {awardDocId:awardDocId},updateData)
    if(!updateAward){
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(updateAward)
})


//Delete
awardRouter.delete("/awards/delete/:awardDocId",login_required,
async (req,res)=>{
  const awardDocId=req.params.awardDocId
  try {   
    const delAwards=await Award.deleteOne({awardDocId})
    res.status(200).send(delAwards)
  }catch(error){
    res.status(500).json({ error: error.message });
  }

})



export { awardRouter}
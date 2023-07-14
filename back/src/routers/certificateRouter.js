import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {Certification} from "../db/models/Certificate"
const certificateRouter = Router();
const mongoose = require('mongoose');
// Create
certificateRouter.put("/:user_id/certificate/register",login_required,async (req, res)=> {
  const user_id=req.params.user_id;
  console.log(req.header.authorization)
  //이때의 id는 유저의 id입니다. (_id 아님)
  // _id는 자동으로 생성됩니다.
  try {
      const newCertificate=await Certification.create({
        id:user_id,
        title:req.body.title,
        issuer:req.body.issuer,
        certDate:req.body.certDate,
        expDate:req.body.expDate,
        certId:req.body.certId,
        description:req.body.description
      })
      const savedCertificate = await newCertificate.save();
      res.send({success:true});
    }
    catch (error) {
    res.status(500).json({ error: error.message });
  }
  // 전달 완료!
});

//Read
certificateRouter.get("/:userId/certificate",
    async function (req, res) {
      try{
        const userId=req.params.userId;
        //이때의 id는 유저의 id입니다. 잘 불러와질지...
        const certificateList=await Certification.findById({userId})
        // id를 기반으로 사용자의 자격증 목록을 불러오고자 함
        res.status(200).json(certificateList)
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }

)
//////////////////////////////////////////////문제의 구간
//Update
certificateRouter.put("/certificate/edit/:id",login_required,async(req,res)=>{
  try{
    const certDocId=req.params.id;
    const updateData=req.body;
    console.log("certDocId",certDocId,"\n")
    console.log("updateData",updateData)
    const updatedCertificate=await Certification.updateOne(
      {certDocId},{updateData}
      )
    res.status(200).json(updatedCertificate)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
    
)
//////////////////////////////////////////////////

//Delete
certificateRouter.delete("/:certDocId/certificate/delete",login_required,
async (req,res)=>{
  const certDocId=req.params.certDocId
  try {   

    const delCertificate=await Certification.deleteOne({certDocId})
    res.status(200).send(delCertificate)
  }catch(error){
    res.status(500).json({ error: error.message });
  }

})



export { certificateRouter };

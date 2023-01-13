import { Component,OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
public name:string="";
public questionlist:any=[];
public currentQuestion:number=0;
public points:number=0;
CorrectAnswer:number=0;
IncorrectAnswer:number=0;
progress:string="0";
isQuizCompleted:boolean=false;

ngOnInit():void{
this.name=localStorage.getItem("name")!;
this.getAllQuestions();

}


constructor(private questionservice:QuestionService){}


getAllQuestions(){
this.questionservice.getQuestionJson()
.subscribe(res=> {
  this.questionlist=res.questions;
})
}
nextQuestion(){
   this.currentQuestion++;
}
perivousQuestion(){
  this.currentQuestion--;
}
answer(Qno:number,option:any){
  if(Qno==this.questionlist.length){
    this.isQuizCompleted=true;
  }
if(option.correct){
  this.points+=10;
  this.CorrectAnswer++;
   setTimeout(() => {
    this.currentQuestion++;
  this.getprogressper()
   },1000);
 
}else{
  setTimeout(() => {
    this.points-=10;
this.IncorrectAnswer++;
this.currentQuestion++;
this.getprogressper();
  }, 1000);

}
}
//progress percentage
getprogressper(){
  this.progress=((this.currentQuestion/this.questionlist.length)*100).toString();
  return this.progress;
}
}

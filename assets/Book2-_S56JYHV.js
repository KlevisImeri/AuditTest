import{c,b as m,e,p as F,r as V,q as Z,s as B,o as P,x as y,w as E,v as S,n as C,t as r,F as M,d as Q,y as W,a as j,z as d,f as G,i as z,A as K,B as O,g as X,h as ee}from"./index-xZsWEGk-.js";import{a as te,b as le,d as oe,u as se}from"./api-CcpJKXYU.js";import{_ as A}from"./_plugin-vue_export-helper-DlAUqK2U.js";const de={},ae={xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 14 14"};function ne(x,u){return m(),c("svg",ae,u[0]||(u[0]=[e("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round",d:"M1 3.5h12m-10.5 0h9v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-9h0Zm2 0V3a2.5 2.5 0 0 1 5 0v.5m-4 2V11m3-5.5V11"},null,-1)]))}const ie=A(de,[["render",ne]]),re={},ue={xmlns:"http://www.w3.org/2000/svg",width:"4em",height:"4em",viewBox:"0 0 24 24"};function ce(x,u){return m(),c("svg",ue,u[0]||(u[0]=[e("path",{fill:"currentColor",d:"M18 20.289L21.288 17l-.688-.688l-2.1 2.1v-4.887h-1v4.887l-2.1-2.1l-.688.688zM14.5 23.5v-1h7v1zm-8.384-4q-.652 0-1.134-.482T4.5 17.884V4.116q0-.652.482-1.134T6.116 2.5H13L18.5 8v3.14h-1V8.5h-5v-5H6.116q-.231 0-.424.192t-.192.423v13.77q0 .23.192.423t.423.192h6v1zm-.616-1v-15z"},null,-1)]))}const me=A(re,[["render",ce]]),ve={},pe={xmlns:"http://www.w3.org/2000/svg",width:"4em",height:"4em",viewBox:"0 0 24 24"};function he(x,u){return m(),c("svg",pe,u[0]||(u[0]=[e("path",{fill:"currentColor",d:"M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"},null,-1)]))}const fe=A(ve,[["render",he]]),be={class:"hidden print:block whitespace-pre-wrap break-all p-1"},i={__name:"Textarea",props:{modelValue:String,wfull:{type:Boolean,default:!0},width:{type:Number,default:20}},emits:["update:modelValue","input"],setup(x,{emit:u}){const k=x,a=u,h=F({get(){return k.modelValue},set(f){a("update:modelValue",f),a("input",f)}}),v=V(null),p=()=>{v.value&&(v.value.style.height="auto",v.value.style.height=`${v.value.scrollHeight}px`)};return Z(()=>h.value,()=>{B(p)},{immediate:!0}),P(()=>{B(()=>{p(),setTimeout(p,51),window.addEventListener("resize",p)})}),y(()=>{window.removeEventListener("resize",p)}),(f,_)=>(m(),c(M,null,[E(e("textarea",{ref_key:"textarea",ref:v,"onUpdate:modelValue":_[0]||(_[0]=b=>h.value=b),class:C(["print:hidden p-1",x.wfull?"w-full":`w-${x.width}`]),rows:"1"},null,2),[[S,h.value]]),e("div",be,r(h.value||" "),1)],64))}},_e={id:"table",class:"p-3 mb-20 w-[1850px] print:hidden"},we={key:0,class:"bg-red-500 text-white p-4 rounded"},Ve={key:1,class:"w-full"},xe={class:"report-header"},ge={class:"flex items-center justify-between font-bold mb-3 p-3"},Ue={class:"flex flex-col items-center"},ke={class:"text-md"},Ie={class:"flex justify-center items-center"},Te={class:"text-md"},Ne={key:0,class:"text-md ml-20"},De={class:"row-div"},$e={class:"row-div"},ze={class:"row-div"},Ee={class:"row-div"},Be={class:"row-div"},Se=["onUpdate:modelValue","onInput"],Ce={class:"row-div"},Me=["onUpdate:modelValue","onInput"],Ae={class:"hidden print:block"},Re={class:"row-div"},He=["onUpdate:modelValue","onInput"],Je={class:"hidden print:block"},qe={class:"row-div"},Le={class:"row-div"},je={class:"row-div"},Ge={class:"row-div"},Ke={class:"row-div"},Oe={class:"entity-grid"},Fe={class:"row-div"},Pe={class:"row-div"},ye={class:"row-div"},Ye={class:"fixed bottom-0 left-0 ml-4 mb-4 flex space-x-4 z-50"},Ze=["disabled"],Qe={class:"p-3 mb-20 hidden print:block"},We={id:"table",class:"report-header"},Xe={class:"report-header"},et={colspan:"10"},tt={class:"flex items-center justify-between font-bold mb-3 p-3"},lt={class:"flex flex-col items-center"},ot={class:"text-md"},st={class:"flex justify-center items-center"},dt={class:"text-md"},at={key:0,class:"text-md ml-20"},nt={class:"report-content"},it={class:"border text-center"},rt={class:"border text-center"},ut={class:"border text-center"},ct={class:"border"},mt={class:"border text-center"},vt={class:"hidden print:block"},pt={class:"border text-center"},ht={class:"hidden print:block"},ft={class:"border"},bt={class:"border"},_t={class:"border"},wt={class:"border"},Vt={class:"border text-center"},xt={class:"border"},gt={class:"border"},Tt=Q({__name:"Book2",setup(x){const u=W(),k=V(""),a=V([]),h=V(null),v=u.params.houseId,{year:p,month:f,day:_,type:b}=u.query,I=V(""),T=V(),N=V(!1),R=V(null),D={0:void 0,1:"Belüftung Räume",2:"Leitungsspülung von Trinkwasserleitungen"};P(async()=>{try{if(v){const s=await te(v);k.value=s.address}console.debug(v,p,f,_,b),a.value=await le(v,p,f,_,b),a.value.forEach((s,l)=>{s.edited=!1,s.index=l}),console.debug("Entries: ",a.value)}catch(s){h.value=s,console.error(s)}q()}),y(async()=>{await H()});const H=async()=>{if(!N.value){N.value=!0;try{if(a.value.length===0)return;const s=a.value.filter(t=>t.deleted),l=[];s.forEach(t=>{t.id&&l.push(t.id)}),l.length>0&&await oe(l),a.value=a.value.filter(t=>!t.deleted);const w=a.value.filter(t=>t.edited);let U=[];w.length>0&&(U=await se(w));for(let t=0;t<w.length;t++)w[t].id=U[t].id;a.value.forEach((t,g)=>{t.edited=!1,t.index=g})}catch(s){h.value=s,console.error(s)}finally{N.value=!1}}},Y=async()=>{const s={index:a.value.length,houseId:Number(v),year:Number(p),month:Number(f),day:Number(_),houseNumber:"",roomNumber:"",repairDescription:"",type:Number(b),noticedDate:"",completedDate:"",emergencyStartTime:"",travelInfo:"",feedbackToOffice:"",extraJob:"",edited:!0};a.value.push(s)};let J=!1;const q=async()=>{var s;J||(await B(),await new Promise(l=>setTimeout(l,100)),a.value.length&&((s=R.value)==null||s.scrollToItem(a.value.length-1)),window.innerHeight+window.scrollY>=document.body.offsetHeight&&(J=!0))},$=s=>{if(!s)return"";const l=s.split("-");if(l.length!==3)return"";const[w,U,t]=l,g=t.padStart(2,"0"),n=U.padStart(2,"0");return`${g}.${n}.${w}`},L=F(()=>{const s=[];if(_&&s.push(_),f){const l=new Intl.DateTimeFormat("de-DE",{month:"long"});s.push(l.format(new Date(2e3,Number(f)-1,1)))}return p&&s.push(p),s.join(" ")});return(s,l)=>{const w=O("DynamicScrollerItem"),U=O("DynamicScroller");return m(),c(M,null,[e("div",_e,[h.value?(m(),c("div",we,r(h.value),1)):(m(),c("div",Ve,[e("div",xe,[e("div",ge,[l[4]||(l[4]=e("p",{class:"text-lg font-bold mr-2"},"Kommunikationsbuch",-1)),e("div",Ue,[e("p",ke,"Gebäudename: "+r(k.value),1),e("div",Ie,[e("p",Te,"Monat und Jahr: "+r(L.value),1),D[z(b)]?(m(),c("p",Ne,r(D[z(b)]),1)):G("",!0)])]),l[5]||(l[5]=e("p",{class:"text-md"},"K-V-I Gebäudemanagement",-1))])]),l[10]||(l[10]=j('<div class="entity-grid bg-gray-100 font-bold text-center top-0 z-10 border-t"><div class="row-div">Pos.</div><div class="row-div">Haus-Nr.</div><div class="row-div">Raum-Nr.</div><div class="row-div">Reparatur (Beschreibungstext)</div><div class="row-div">Typ</div><div class="row-div">festgestellt am:</div><div class="row-div">erledigt am:</div><div class="row-div">Uhrzeit bei Noteinsatz:</div><div class="row-div">Anfahrt</div><div class="row-div">Rückinfo ans Amt</div><div class="row-div">Extra Arbeit</div><div class="row-div"></div></div>',1)),d(U,{ref_key:"scroller",ref:R,items:a.value,"min-item-size":20,"key-field":"index",pageMode:!0,onResize:q},{default:K(({item:t,index:g,active:n})=>[d(w,{item:t,active:n,"size-dependencies":[t.roomNumber,t.houseNumber,t.extraJob],"data-index":g},{default:K(()=>[(m(),c("div",{key:t.index,class:C([{"bg-red-200":t.deleted,"bg-gray-200":t.edited},"entity-grid"])},[e("div",De,r(t.index+1),1),e("div",$e,[d(i,{class:"text-center w-full",modelValue:t.houseNumber,"onUpdate:modelValue":o=>t.houseNumber=o,wfull:!0,onInput:o=>t.edited=!0},null,8,["modelValue","onUpdate:modelValue","onInput"])]),e("div",ze,[d(i,{class:"w-full text-center",modelValue:t.roomNumber,"onUpdate:modelValue":o=>t.roomNumber=o,wfull:!0,onInput:o=>t.edited=!0},null,8,["modelValue","onUpdate:modelValue","onInput"])]),e("div",Ee,[d(i,{class:"w-full",modelValue:t.repairDescription,"onUpdate:modelValue":o=>t.repairDescription=o,onInput:o=>t.edited=!0},null,8,["modelValue","onUpdate:modelValue","onInput"])]),e("div",Be,[E(e("select",{"onUpdate:modelValue":o=>t.type=o,onInput:o=>t.edited=!0,class:"w-full"},l[6]||(l[6]=[e("option",{value:0},"Kommunikationsbuch",-1),e("option",{value:1},"Belüftung Räume",-1),e("option",{value:2},"Leitungsspülung von Trinkwasserleitungen",-1)]),40,Se),[[ee,t.type,void 0,{number:!0}]])]),e("div",Ce,[E(e("input",{"onUpdate:modelValue":o=>t.noticedDate=o,type:"date",class:"w-full p-1 print:hidden",onInput:o=>t.edited=!0},null,40,Me),[[S,t.noticedDate]]),e("div",Ae,r($(t.noticedDate)),1)]),e("div",Re,[E(e("input",{"onUpdate:modelValue":o=>t.completedDate=o,type:"date",class:"w-full p-1 print:hidden",onInput:o=>t.edited=!0},null,40,He),[[S,t.completedDate]]),e("div",Je,r($(t.completedDate)),1)]),e("div",qe,[d(i,{class:"w-full",modelValue:t.emergencyStartTime,"onUpdate:modelValue":o=>t.emergencyStartTime=o,onInput:o=>t.edited=!0},null,8,["modelValue","onUpdate:modelValue","onInput"])]),e("div",Le,[d(i,{class:"w-full",modelValue:t.travelInfo,"onUpdate:modelValue":o=>t.travelInfo=o,onInput:o=>t.edited=!0},null,8,["modelValue","onUpdate:modelValue","onInput"])]),e("div",je,[d(i,{class:"w-full",modelValue:t.feedbackToOffice,"onUpdate:modelValue":o=>t.feedbackToOffice=o,onInput:o=>t.edited=!0},null,8,["modelValue","onUpdate:modelValue","onInput"])]),e("div",Ge,[d(i,{class:"w-full",modelValue:t.extraJob,"onUpdate:modelValue":o=>t.extraJob=o,onInput:o=>t.edited=!0},null,8,["modelValue","onUpdate:modelValue","onInput"])]),e("div",Ke,[d(ie,{class:"hover:text-red-500",onClick:o=>{t.deleted=!t.deleted}},null,8,["onClick"])])],2))]),_:2},1032,["item","active","size-dependencies","data-index"])]),_:1},8,["items"]),e("div",Oe,[e("div",Fe,r(a.value.length+1),1),l[7]||(l[7]=j('<div class="row-div"></div><div class="row-div"></div><div class="border-r border-b p-1">Bearbeitet:</div><div class="row-div"></div><div class="row-div"></div><div class="row-div"></div><div class="border-r border-b p-1">Anfahrt</div>',7)),e("div",Pe,[d(i,{modelValue:I.value,"onUpdate:modelValue":l[0]||(l[0]=t=>I.value=t)},null,8,["modelValue"])]),e("div",ye,[d(i,{modelValue:T.value,"onUpdate:modelValue":l[1]||(l[1]=t=>T.value=t)},null,8,["modelValue"])]),l[8]||(l[8]=e("div",{class:"row-div"},null,-1)),l[9]||(l[9]=e("div",{class:"row-div"},null,-1))])])),e("div",Ye,[e("button",{class:"print:hidden text-blue-500 hover:text-red-500 transition-colors",onClick:Y},[d(fe,{class:"inline-block"})]),e("button",{class:"print:hidden disabled:opacity-50 disabled:cursor-not-allowed transition-colors",onClick:H,disabled:N.value},[d(me,{class:"text-green-500 hover:text-red-500 inline-block"})],8,Ze)])]),e("div",Qe,[e("table",We,[e("thead",Xe,[e("tr",null,[e("th",et,[e("div",tt,[l[11]||(l[11]=e("p",{class:"text-lg font-bold mr-2"},"Kommunikationsbuch",-1)),e("div",lt,[e("p",ot,"Gebäudename: "+r(k.value),1),e("div",st,[e("p",dt,"Monat und Jahr: "+r(L.value),1),D[z(b)]?(m(),c("p",at,r(D[z(b)]),1)):G("",!0)])]),l[12]||(l[12]=e("p",{class:"text-md"},"K-V-I Gebäudemanagement",-1))])])]),l[13]||(l[13]=e("tr",{class:"bg-gray-100"},[e("th",{class:"border px-1"},"Pos."),e("th",{class:"border px-1"},"Haus-Nr."),e("th",{class:"border px-1"},"Raum-Nr."),e("th",{class:"border px-40"},"Reparatur (Beschreibungstext)"),e("th",{class:"border px-1 print:hidden"},"Typ"),e("th",{class:"border px-1"},"festgestellt am:"),e("th",{class:"border px-5"},"erledigt am:"),e("th",{class:"border px-8"},"Uhrzeit bei Noteinsatz:"),e("th",{class:"border px-1"},"Anfahrt"),e("th",{class:"border px-1"},"Rückinfo ans Amt"),e("th",{class:"border px-10"},"Extra Arbeit")],-1))]),e("tbody",nt,[(m(!0),c(M,null,X(a.value,(t,g)=>(m(),c("tr",{key:t.id,class:C({"bg-red-200":t.deleted,"bg-gray-200":t.edited})},[e("td",it,r(g+1),1),e("td",rt,[d(i,{class:"w-full",modelValue:t.houseNumber,"onUpdate:modelValue":n=>t.houseNumber=n},null,8,["modelValue","onUpdate:modelValue"])]),e("td",ut,[d(i,{class:"w-full",modelValue:t.roomNumber,"onUpdate:modelValue":n=>t.roomNumber=n},null,8,["modelValue","onUpdate:modelValue"])]),e("td",ct,[d(i,{class:"w-full",modelValue:t.repairDescription,"onUpdate:modelValue":n=>t.repairDescription=n},null,8,["modelValue","onUpdate:modelValue"])]),e("td",mt,[e("div",vt,r($(t.noticedDate)),1)]),e("td",pt,[e("div",ht,r($(t.completedDate)),1)]),e("td",ft,[d(i,{modelValue:t.emergencyStartTime,"onUpdate:modelValue":n=>t.emergencyStartTime=n},null,8,["modelValue","onUpdate:modelValue"])]),e("td",bt,[d(i,{class:"w-full",modelValue:t.travelInfo,"onUpdate:modelValue":n=>t.travelInfo=n,onInput:n=>t.edited=!0},null,8,["modelValue","onUpdate:modelValue","onInput"])]),e("td",_t,[d(i,{class:"w-full",modelValue:t.feedbackToOffice,"onUpdate:modelValue":n=>t.feedbackToOffice=n},null,8,["modelValue","onUpdate:modelValue"])]),e("td",wt,[d(i,{class:"w-full",modelValue:t.extraJob,"onUpdate:modelValue":n=>t.extraJob=n},null,8,["modelValue","onUpdate:modelValue"])])],2))),128)),e("tr",null,[e("td",Vt,r(a.value.length+1),1),l[14]||(l[14]=e("td",{class:"border text-center"},null,-1)),l[15]||(l[15]=e("td",{class:"border text-center"},null,-1)),l[16]||(l[16]=e("td",{class:"border p-1"},"Bearbeitet:",-1)),l[17]||(l[17]=e("td",{class:"border print:hidden"},null,-1)),l[18]||(l[18]=e("td",{class:"border"},null,-1)),l[19]||(l[19]=e("td",{class:"border"},null,-1)),l[20]||(l[20]=e("td",{class:"border p-1"},"Anfahrt",-1)),e("td",xt,[d(i,{modelValue:I.value,"onUpdate:modelValue":l[2]||(l[2]=t=>I.value=t)},null,8,["modelValue"])]),e("td",gt,[d(i,{modelValue:T.value,"onUpdate:modelValue":l[3]||(l[3]=t=>T.value=t),class:"p1"},null,8,["modelValue"])]),l[21]||(l[21]=e("td",{class:"border"},null,-1))])])])])],64)}}});export{Tt as default};

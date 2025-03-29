import{r as s,o as w,c as n,e as o,f as h,n as k,t as y,k as U,w as l,v,h as V,F as M,g as q,m as B,i as C,u as R,b as u}from"./index-DxSvRIrJ.js";import{g as S,s as z}from"./api-CcpJKXYU.js";const F={class:"flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white"},H={class:"bg-white p-8 rounded-2xl shadow-lg w-80 transition-all duration-300 hover:shadow-xl"},N={class:"mb-4"},O={class:"mb-4"},T={class:"mb-6"},A={class:"mb-4"},D=["value"],L={class:"mb-6 flex items-center"},K={__name:"SignUp",setup(_){const m=R(),a=s(""),d=s(""),i=s(""),c=s([]),p=s(""),b=s(!0),r=s(""),g=s(""),x=async()=>{try{await z(a.value,d.value,i.value,p.value,b.value),r.value="Registrierung erfolgreich!",g.value="success",setTimeout(()=>m.push("/login"),1e3)}catch(f){r.value="Registrierung fehlgeschlagen",g.value="error",console.error("Fehler:",f)}};return w(async()=>{c.value=await S()}),(f,e)=>(u(),n("div",F,[o("div",H,[e[10]||(e[10]=o("h1",{class:"text-3xl font-bold mb-6 text-center text-blue-900"},"Registrierung",-1)),r.value?(u(),n("div",{key:0,class:k([g.value==="success"?"bg-green-100 text-green-700":"bg-red-100 text-red-700","p-3 mb-4 rounded-lg text-center"])},y(r.value),3)):h("",!0),o("form",{onSubmit:U(x,["prevent"]),class:"flex flex-col"},[o("div",N,[l(o("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>a.value=t),type:"text",placeholder:"Benutzername",class:"w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500",required:""},null,512),[[v,a.value]])]),o("div",O,[l(o("input",{"onUpdate:modelValue":e[1]||(e[1]=t=>d.value=t),type:"password",placeholder:"Passwort",class:"w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500",required:""},null,512),[[v,d.value]])]),o("div",T,[l(o("input",{"onUpdate:modelValue":e[2]||(e[2]=t=>i.value=t),type:"email",placeholder:"beispiel@email.de",class:"w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500",required:""},null,512),[[v,i.value]])]),o("div",A,[l(o("select",{"onUpdate:modelValue":e[3]||(e[3]=t=>p.value=t),class:"w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500",required:""},[e[6]||(e[6]=o("option",{value:"",disabled:""},"Wähle ein Haus",-1)),e[7]||(e[7]=o("option",{value:-1},"Alle",-1)),(u(!0),n(M,null,q(c.value,t=>(u(),n("option",{key:t.id,value:t.id},y(t.address),9,D))),128))],512),[[V,p.value]])]),o("div",L,[l(o("input",{type:"checkbox","onUpdate:modelValue":e[4]||(e[4]=t=>b.value=t),id:"todayOnly",class:"mr-2"},null,512),[[B,b.value]]),e[8]||(e[8]=o("label",{for:"todayOnly",class:"text-gray-700"},"Nur heute",-1))]),e[9]||(e[9]=o("button",{type:"submit",class:"bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform hover:scale-105 focus:outline-none cursor-not-allowed",disabled:""}," Unter Konstruktion ",-1)),o("button",{type:"button",onClick:e[5]||(e[5]=t=>C(m).push("/Login")),class:"mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg focus:outline-none"}," Zurück zur Anmeldung ")],32)])]))}};export{K as default};

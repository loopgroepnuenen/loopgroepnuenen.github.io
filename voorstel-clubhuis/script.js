/*! PDFix license http://pdfix.net/terms. Copyright (c) 2016 Pdfix. All Rights Reserved. */
;function pdfixUpdateLayout(){pdfixUpdatePages()}window.addEventListener("resize",pdfixUpdateLayout);window.addEventListener("load",function window_load(a){pdfixUpdateLayout()},false);function getFirstChild(c,b,d){var a=c.firstChild;while(a!==null){if(a.nodeType==1&&(b==""||a.nodeName.toLowerCase()==b)&&(d==""||a.getAttribute("data-type")==d)){break}a=a.nextSibling}return a}function getNextSibling(c,b,d){var a=c.nextSibling;while(a!==null){if(a.nodeType==1&&(b==""||a.nodeName.toLowerCase()==b)&&(d==""||a.getAttribute("data-type")==d)){break}a=a.nextSibling}return a}function pdfixUpdatePages(){var a=document.getElementById("pdf-document");if(a===undefined||a==null||a.getAttribute("data-type")!="pdf-document"){return}var b=getNextSibling(a,"div","pdf-page");while(b!==null){if(b.style.display!="none"){pdfixUpdatePage(b)}b=getNextSibling(b,"div","pdf-page")}}function pdfixUpdatePage(c,b){if(c==null){return}var a=c.getAttribute("data-layout");if(a=="responsive"){pdfixUpdatePageResponsive(c,b)}else{pdfixUpdatePageFixed(c,b)}}function pdfixUpdatePageFixed(h,m){var k=h.getAttribute("data-ratio");var c=parseFloat(h.offsetWidth);h.style.height=c*k+"px";var f=getFirstChild(h,"div","pdf-page-inner");var d=1;if(f!==null){var n=parseFloat(f.getAttribute("data-page-width"));var d=c/n;f.style.transform="scale("+d+")";f.style.transformOrigin="0px 0px 0px"}if(m===undefined||m!=false){var j=getFirstChild(h,"div","pdf-page-text");if(j!==null){var n=parseFloat(j.style.width);var d=c/n;j.style.transform="scale("+d+")";j.style.transformOrigin="0px 0px 0px";updatePageTextsOnce(j)}var l=getFirstChild(h,"div","pdf-page-annots");if(l!==null){var n=parseFloat(l.style.width);var d=c/n;l.style.transform="scale("+d+")";l.style.transformOrigin="0px 0px 0px";if(l.children){for(var g=0;g<l.children.length;g++){if(l.children[g].className.indexOf("pdf-field-comb")!==-1){var a=l.children[g].offsetWidth;var b=l.children[g].maxLength;var e=parseInt(window.getComputedStyle(l.children[g]).fontSize)*0.65;var o=(Math.ceil(a/b)-e);l.children[g].style.letterSpacing=o+"px";l.children[g].style.textIndent=o/2+"px"}}}}}}function pdfixUpdatePageResponsive(e,j){var g=e.getElementsByTagName("figure");for(var c=0,b=g.length;c<b;c++){if(g[c].getAttribute("data-type")=="pdf-image"){var d=g[c];var k=d.parentElement;var a=parseFloat(d.getAttribute("data-image-width"));var l=parseFloat(d.getAttribute("data-ratio"));var o=parseFloat(k.offsetWidth);var f=o/a;if(f>1){f=1}d.style.height=a*f/l+"px";var h=getFirstChild(d,"div","pdf-image-inner");var m=getFirstChild(h,"div","pdf-image-childs");if(m!=null){updatePageTextsOnce(m)}h.style.transform="scale("+f+")";h.style.transformOrigin="0px 0px 0px"}}}function updatePageTextsOnce(d){if(d.getAttribute("data-text-scaled")!="1"){var a=d.firstChild;while(a!=null){if(a.nodeType==1){var i=getFirstChild(a,"span","");if(i!=null){var b=parseFloat(i.offsetWidth);var h=parseFloat(a.offsetWidth);var c=parseFloat(i.offsetHeight);var f=parseFloat(a.offsetHeight)-1;var g=h/b;var e=f/c;a.style.transform="scaleX("+g+") scaleY("+e+")";a.style.transformOrigin="0px 0px 0px"}}a=a.nextSibling}d.setAttribute("data-text-scaled","1")}};/*! PDFix license http://pdfix.net/terms. Copyright (c) 2016 Pdfix. All Rights Reserved. */
;var DOUBLE_CORRECT=1e-15;var ERROR_AFNUMBER_KEYSTROKE="The input value is invalid.";var ERROR_AFRANGE_GT_AND_LT="Invalid value: must be greater than or equal to %s and less than or equal to %s.";var ERROR_AFRANGE_GT="Invalid value: must be greater than or equal to %s.";var ERROR_AFRANGE_LT="Invalid value: must be less than or equal to %s.";var ERROR_PARSE_DATETIME="The input value can't be parsed as a valid date/time (%s).";var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var fullMonths=["January","February","March","April","May","Jun","Jul","August","September","October","November","December"];var oldDateFormats=["m/d","m/d/yy","mm/dd/yy","mm/yy","d-mmm","d-mmm-yy","dd-mmm-yy","yy-mm-dd","mmm-yy","mmmm-yy","mmm d, yyyy","mmmm d, yyyy","m/d/yy h:MM tt","m/d/yy HH:MM"];var dateFormats=["m/d","m/d/yy","m/d/yyyy","mm/dd/yy","mm/dd/yyyy","mm/yy","mm/yyyy","d-mmm","d-mmm-yy","d-mmm-yyyy","dd-mmm-yy","dd-mmm-yyyy","yy-mm-dd","yyyy-mm-dd","mmm-yy","mmm-yyyy","mmmm-yy","mmmm-yyyy","mmm d, yyyy","mmmm d, yyyy","m/d/yy h:MM tt","","m/d/yyyy h:MM tt","m/d/yy HH:MM","m/d/yyyy HH:MM"];var timeFormats=["HH:MM","h:MM tt","HH:MM:ss","h:MM:ss tt"];function AFNumber_Format(j,e,g,i,c,n){var l=event.target;if(j<0){j=-j}if(e<0||e>3){e=0}if(g<0||g>3){g=0}var m=parseFloat(event.value.replace(",","."));if(!isNaN(m)){if(m>0){m+=DOUBLE_CORRECT}var d=m<0;var k=Math.abs(m).toFixed(j);if(k.length==0){k="0"}var h=".";var a="";switch(e){case 0:a=",";break;case 1:break;case 2:a=".";h=",";break;case 3:h=",";break;case 4:a="'";break}var f=k.toString().split(".");if(a.length>0){f[0]=f[0].replace(/\B(?=(\d{3})+(?!\d))/g,a)}var b=f[0];if(f.length>1&&f[1].length>0){b=b+h+f[1]}if(n){b=c+b}else{b=b+c}if(g!=0){if(d){if(g==2||g==3){b="("+b+")"}if(g==1||g==3){l.color=color.red}}else{l.color=color.black}}else{if(d){b="-"+b}}}else{b=""}event.value=b}function AFNumber_Keystroke(l,d,j,k,c,r){var b=event.value;var m=event.change;if(event.willCommit){var f=trim(b);if(f.length==0){return}f.replace(",",".");if(isNaN(f)){event.rc=false;app.alert(ERROR_AFNUMBER_KEYSTROKE)}return}var p="";if(event.selStart!=-1){p=p.substr(event.selStart,event.selEnd-event.selStart)}var n=(b.charAt(0)=="-"&&p.charAt(0)=="-");if(n){event.rc=false;return}if(d<0||d>3){d=0}var q=(d==2||d==3)?",":".";var h=b.indexOf(q)!=-1;for(var e=0;e<m.length;e++){var a=m.charAt(e);if(a==q){if(h){event.rc=false;return}h=true;continue}if(a=="-"){if(n||e!=0||event.selStart!=0){event.rc=false;return}continue}if(isNaN(parseFloat(a))){event.rc=false;return}}var g=b.substr(0,event.selStart);var o="";if(event.selEnd<b.length){o=b.substr(event.selEnd)}b=g+m+o;event.value=b}function AFPercent_Format(g,d){if(g<0){g=-g}if(d<0||d>3){d=0}var i=parseFloat(event.value.replace(",","."));i*=100;if(g>0){i+=DOUBLE_CORRECT}var c=i<0;var h=Math.abs(i).toFixed(g);if(h.length==0){h="0"}var f=".";var a="";switch(d){case 0:a=",";break;case 1:break;case 2:a=".";f=",";break;case 3:f=",";break;case 4:a="'";break}var e=h.toString().split(".");if(a.length>0){e[0]=e[0].replace(/\B(?=(\d{3})+(?!\d))/g,a)}var b=e[0];if(e.length>1&&e[1].length>0){b=b+f+e[1]}if(c){b="-"+b}b+="%";event.value=b}function AFPercent_Keystroke(b,a){return AFNumber_Keystroke(b,a,0,0,"",true)}function AFDate_FormatEx(b){if(event.value==""){return}var a=AFParseDateEx(event.value,b);if(!a){app.alert(util.printf(ERROR_PARSE_DATETIME,event.value));event.rc=false;return}event.value=util.printd(b,a)}function AFDate_KeystrokeEx(b){if(typeof event.value!="string"){event.rc=false;return}if(event.value==""){return}var a=AFParseDateEx(event.value,b);if(!a){app.alert(util.printf(ERROR_PARSE_DATETIME,event.value));event.rc=false;return}return true}function AFDate_Format(a){if(a<0||a>=oldDateFormats.length){a=0}AFDate_FormatEx(oldDateFormats[a])}function AFDate_Keystroke(a){if(a<0||a>=oldDateFormats.length){a=0}AFDate_KeystrokeEx(oldDateFormats[a])}function AFTime_FormatEx(b){if(event.value==""){return}var a=AFParseDateEx(event.value,b);if(!a){app.alert(util.printf(ERROR_PARSE_DATETIME,event.value));event.rc=false;return}event.value=util.printd(b,a)}function AFTime_KeystrokeEx(b){if(event.value==""){return}var a=AFParseDateEx(event.value,b);if(!a){app.alert(util.printf(ERROR_PARSE_DATETIME,event.value));event.rc=false;return}}function AFTime_Format(a){if(a<0||a>=timeFormats.length){a=0}AFTime_FormatEx(timeFormats[a])}function AFTime_Keystroke(a){if(event.value==""){return}var b=AFParseDateEx(event.value,cFormat);if(!b){app.alert(util.printf(ERROR_PARSE_DATETIME,event.value));event.rc=false;return}}function AFSpecial_Format(b){if(isNaN(b)){return}var a=parseInt(event.value);switch(b){case 0:format="99999";break;case 1:format="99999-9999";break;case 2:format=a>999999999?"(999) 999-9999":"999-9999";break;case 3:format="999-99-9999";break}if(typeof format=="string"){event.value=util.printx(format,a)}}function AFSpecial_Keystroke(a){console.println("AFSpecial_Keystroke not implemented")}function AFSpecial_KeystrokeEx(a){console.println("AFSpecial_KeystrokeEx not implemented")}function AFSimple(a,c,b){switch(a){case"AVG":return(c+b)/2;case"SUM":return(c+b);case"PRD":return(c*b);case"MIN":return Math.min(c,b);case"MAX":return Math.max(c,b)}return c}function AFMakeNumber(a){if(typeof a=="number"){return a}var b=0;if(typeof a=="string"){b=parseFloat(a.replace(",","."))}if(isNaN(b)){b=0}return b}function AFSimple_Calculate(b,c){var g=b=="PRD"?1:0;var a=AFMakeArrayFromList(c);var e=0;for(var d=0;d<a.length;d++){var h=this.getField(a[d]);if(h==null){continue}var f=AFMakeNumber(h.value);if(d==0&&(b=="MIN"||b=="MAX")){g=f}else{g=AFSimple(b,g,f)}e++}if(e>0&&b=="AVG"){g/=e}event.value=g}function AFRange_Validate(h,c,e,g){if(event.value==""){return}var f=parseFloat(event.value.replace(",","."));var b=(!h||f>=c);var a=(!e||f<=g);var d="";if(!b||!a){if(!b&&!a){d=util.printf(ERROR_AFRANGE_GT_AND_LT,c,g)}else{if(!b){d=util.printf(ERROR_AFRANGE_GT,c)}else{if(!a){d=util.printf(ERROR_AFRANGE_LT,g)}}}event.rc=false}if(d.length>0){app.alert(d)}}function AFMergeChange(a){if(a.willCommit){return a.value}var b=a.value.substr(0,a.selStart);var c="";if(a.selEnd>=0&&a.selEnd<val.length){c=val.substr(a.selEnd)}return b+change+c}function AFParseDateEx(c,d){var a=new Date();if(!c){return a}dd=1;HH=0;MM=0;SS=0;if(dateFormats.findIndex(function(f){return f==d})!=-1||timeFormats.findIndex(function(f){return f==d})!=-1){regex=/^(\d{1,4}|[a-zA-Z]+)(?:[-/:,. ])?(\d{1,4}|[a-zA-Z]+)?(?:[,-:/.])?(?: )?(\d{1,4})?[ ]?(\d{1,2})?[:]?(\d{1,2})?[:]?(\d{1,2})?[ ]?(am|pm)?$/}if(typeof regex!="undefined"){var b=c.match(regex);if(!b){return null}switch(d){case dateFormats[0]:case dateFormats[1]:case dateFormats[2]:case dateFormats[3]:case dateFormats[4]:case dateFormats[18]:case dateFormats[19]:case dateFormats[20]:case dateFormats[21]:case dateFormats[22]:case dateFormats[23]:mm=b[1];dd=b[2];yy=b[3];HH=b[4];MM=b[5];tt=b[7];break;case dateFormats[5]:case dateFormats[6]:case dateFormats[14]:case dateFormats[15]:case dateFormats[16]:case dateFormats[17]:mm=b[1];yy=b[2];break;case dateFormats[7]:case dateFormats[8]:case dateFormats[9]:case dateFormats[10]:case dateFormats[11]:dd=b[1];mm=b[2];yy=b[3];break;case dateFormats[12]:case dateFormats[13]:yy=b[1];mm=b[2];dd=b[3];break;case timeFormats[0]:case timeFormats[1]:case timeFormats[2]:case timeFormats[3]:HH=b[1];MM=b[2];SS=b[3];tt=b[7];break}}if(typeof mm!="undefined"){if(!isNaN(mm)){mm=parseInt(mm)-1}else{mm=mm.substr(0,3).toLowerCase();mm=months.findIndex(function(f){return mm==f.toLowerCase()});if(mm<0){return null}}a.setMonth(mm)}if(typeof dd!="undefined"){dd=parseInt(dd);if(!isNaN(dd)){a.setDate(dd)}}if(typeof yy!="undefined"){yy=parseInt(yy);if(!!isNaN(yy)){if(yy<50){yy+=2000}else{if(yy<100){yy+=1900}}a.setFullYear(yy)}}if(typeof HH!="undefined"){HH=parseInt(HH);if(!isNaN(HH)){if(typeof tt=="string"&&HH>12&&tt.toLowerCase()==="pm"){HH-=12}a.setHours(HH)}}if(typeof MM!="undefined"){MM=parseInt(MM);if(!isNaN(MM)){a.setMinutes(MM)}}if(typeof SS!="undefined"){SS=parseInt(SS);if(!isNaN(SS)){a.setSeconds(SS)}}return a}function AFMakeArrayFromList(b){var a=typeof b;if(a=="string"){return b.split(",")}else{if(Array.isArray(b)){return b}}return[]};/*! PDFix license http://pdfix.net/terms. Copyright (c) 2016 Pdfix. All Rights Reserved. */
;document.addEventListener("DOMContentLoaded",acroform_init);function acroform_init(){do_calculations()}function register_page_widgets(c){var b=c.querySelector("[data-type='pdf-page-annots']");if(b==undefined&&b==null){return}var a=b.querySelectorAll("input,textarea,button");a.forEach(function(d){register_widget(d)})}function register_widget(g){var c=g.getAttribute("name");var b=g.getAttribute("data-field-id");var a=g.getAttribute("data-annot-id");if(c==undefined||b==undefined||a==undefined){return}g.addEventListener("focus",field_event);g.addEventListener("blur",field_event);g.addEventListener("change",field_event);g.addEventListener("click",field_event);g.addEventListener("keypress",field_event);var d=init_field(g.name);if(d){d._updateWidgets()}}var Fields=[];var calc_fields=[];function register_field(a){if(Fields[a.name]!=undefined){return}Fields[a.name]=new Field(a)}function register_calc_field(a){calc_fields.push(a)}var border=new Object();border.s="solid";border.b="beveled";border.d="dashed";border.i="inset";border.u="underline";var color=new Object();color.transparent=["T"];color.black=["G",0];color.white=["G",1];color.red=["RGB",1,0,0];color.green=["RGB",0,1,0];color.blue=["RGB",0,0,1];color.cyan=["CMYK",1,0,0,0];color.magenta=["CMYK",0,1,0,0];color.yellow=["CMYK",0,0,1,0];color.dkGray=["G",0.25];color.gray=["G",0.5];color.ltGray=["G",0.75];color.convert=function(b,a){};color.equal=function(b,a){};function Field(a){this._data=a;if(this._data.value==undefined){this._data.value=""}if(this._data.hidden==undefined){this._data.hidden=false}this._updateWidgets=function(){var b=this;document.querySelectorAll("[data-field-id='"+this._data.id+"']").forEach(function(c){if(b._data.type=="radio"||b._data.type=="checkbox"){if(c.value==b.value){c.checked=true}else{c.checked=false}}else{c.value=b.getFormattedValue()}c.style.display=c.hidden?"none":""})};Object.defineProperty(this,"name",{get:function(){return this._data.name}});Object.defineProperty(this,"value",{get:function(){if(typeof this._value_tmp=="string"&&this._value_tmp==""){return this._data.value}if(this._data.value.toString().search(/[^0123456789.]/)!=-1){return this._data.value}var b=parseFloat(this._data.value);if(!isNaN(b)){return b}return this._data.value},set:function(b){this._data.value=b;this._updateWidgets()}});Object.defineProperty(this,"valueAsString",{get:function(){return this._data.value.toString()}});Object.defineProperty(this,"hidden",{get:function(){if(this._data.hidden==undefined){return false}return this._data.hidden},set:function(b){if(typeof b!=="boolean"){return}this._data.hidden=b;this._updateWidgets()}});Object.defineProperty(this,"maxLength",{get:function(){return 0},set:function(b){}});this.k="K"+this._data.id+"()";this.c="C"+this._data.id+"()";this.f="F"+this._data.id+"()";this.v="V"+this._data.id+"()";this.u="U"+this._data.id+"()";this.fo="Fo"+this._data.id+"()";this.bl="Bl"+this._data.id+"()";this.clearItems=function(){for(var b=this.elem.options.length-1;b>=0;b--){this.elem.remove(b)}};this.getFormattedValue=function(){create_event();event.type="Field";event.name="Format";event.target=this;event.source=this;event.maxLength=this.maxLength;event.willCommit=false;event.value=this.value.toString();event.rc=true;do_field_event();var b=event.rc?event.value:this.value;destroy_event();return b.toString()};this.checkThisBox=function(c,b){if(this._data.type!="checkbox"&&this._data.type!="radio"){return}if(b==false){if(this.value==this._data.exportValues[c]){this.value="Off"}}else{this.value=this._data.exportValues[c]}}}function init_field(a){if(typeof(a)=="string"){return Fields[a]}return null}var app=new function(){this.viewerVersion=1;this.viewerType="PdfixHTML5";this.response=function(){return null};this.beep=function(a){};this.alert=function(a){window.alert(a)}};this.external=false;this.calculate=false;this.calculateNow=function(){var a=this.calculate;this.calculate=true;do_calculations();this.calculate=a};this.getField=function(a){return init_field(a)};this.resetForm=function(d){for(var b=0;b<all_fields.length;b++){var c=all_fields[b];var a=document.getElementById(c.name);a.value=a.getAttribute("data-default-value")}calculateNow()};this.submitForm=function(b,x,m,f,l,a,w,t,i,r,k,e,n,p,s,d,g,j,o,v,q,z,u){var h={};for(var y in Fields){var c=Fields[y];if(!c){throw"Field with name "+y+" does not exist"}if(m!=null&&m==false&&c.value==""){continue}h[y]=c.value}if(typeof SubmitForm==="function"){SubmitForm(h)}else{console.log("Method SubmitForm is not defined. Once it's deined submitting form data can be customized.")}};console.println=function(a){console.log(a)};var util=new function(){};util.printf=function(){var q=0;var r=arguments[q++];var a=/%(,[0-3])?[+#0 ]?([.]\d)?[dfsx]/;while(q<arguments.length){var b=arguments[q++];var c=r.search(a);if(c==-1){break}var h=1;var k="";var f=0;var l=0;var s="";var o=c+1;var g=r.charAt(o++);if(g==","){h=parseInt(r.charAt(o++));g=r.charAt(o++)}while(g=="+"||g=="#"||g=="0"||g==" "){k+=g;g=r.charAt(o++);if(k.length==4){break}}if(!isNaN(g)){f=parseInt(g);g=r.charAt(o++)}if(g=="."){l=parseInt(r.charAt(o++));g=r.charAt(o++)}s=g;var e=r.substr(0,c);var p=r.substr(g,r.length-g);if(s=="s"){b=b.toString()}else{if(s=="x"){b=b.toString(16)}else{if(s=="d"||s=="f"){b=parseFloat(b);if(isNaN(b)){b=0}var u=Math.pow(10,l);b=parseFloat(Math.round(b*u))/u;var m=b.toString().split(".");var j="";var v=".";switch(h){case 0:j=",";break;case 2:j=".";v=",";break}m[0]=m[0].replace(/\B(?=(\d{3})+(?!\d))/g,j);b=m.join(v)}}}r=e+b+p}return r};util.printd=function(){var h=0;var o=arguments[h++];var b=arguments[h++];if(typeof(o)!="string"){o="HH:MM:ss"}var g=b.getFullYear();var n=parseInt(g.toString().substr(2,2));var c=b.getMonth()+1;var j=fullMonths[c-1];var a=months[c-1];var l=b.getDate();var p=b.getHours();var k=b.getMinutes();var f=b.getSeconds();var e=p>=12?"pm":"am";if(o.search("tt")!=-1){o=o.replace("tt",e);if(p>12){p-=12}}o=o.replace("yyyy",g);o=o.replace("yy",n);o=o.replace("mmmm",j);o=o.replace("mmm",a);o=o.replace("mm",c<10?"0"+c:c);o=o.replace("m",c);o=o.replace("dd",l<10?"0"+l:l);o=o.replace("d",l);o=o.replace("HH",p<10?"0"+p:p);o=o.replace("H",p);o=o.replace("MM",k<10?"0"+k:k);o=o.replace("M",k);o=o.replace("ss",f<10?"0"+f:f);o=o.replace("s",f);return o};util.printx=function(h,a){var g="";var b=0;var e="";if(a!=null&&!isNaN(a)){e+=a}a=e;var d=a.length;for(var c=0;(c<h.length)&&(b<d);c++){var f=h[c];switch(f){case"?":g+=a[b];b++;break;case"X":while(b<d){if((a[b]>="0"&&a[b]<="9")||(a[b]>="a"&&a[b]<="z")||(a[b]>="A"&&a[b]<="Z")){g+=a[b];b++;break}b++}break;break;case"A":while(b<d){if((a[b]>="a"&&a[b]<="z")||(a[b]>="A"&&a[b]<="Z")){g+=a[b];b++;break}b++}break;break;case"9":while(b<d){if(a[b]>="0"&&a[b]<="9"){g+=a[b];b++;break}b++}break;case"*":g.append(a,b,d-b);b=d-1;break;case"\\":break;case">":a=a.toUpperCase();break;case"<":a=a.toLowerCase();break;case"=":break;default:g+=f;break}}return g};var events=[];var event=null;var current_events=[];function create_event(){event=new Object();event.rc=true;events.push(event);return event}function destroy_event(){event=null;events.pop();if(events.length>0){event=events[events.length-1]}}function do_field_event(){if(current_events.find(function(obj){if(obj==event.target){return obj}})!=undefined){return}current_events.push(event.target);try{if(event.name=="Keystroke"){eval(event.target.k)}else{if(event.name=="Format"){eval(event.target.f)}else{if(event.name=="Mouse Up"){eval(event.target.u)}else{if(event.name=="Blur"){eval(event.target.bl)}else{if(event.name=="Focus"){eval(event.target.fo)}else{if(event.name=="Validate"){eval(event.target.v)}}}}}}}catch(ex){}current_events.pop()}function field_event(g){var c=init_field(g.target.name);if(c==null){return}create_event();event.type="Field";event.name="Keystroke";event.target=c;event.source=c;event.maxLength=c.maxLength;event.willCommit=false;event.value=g.target.value.toString();var h=true;if(g.type=="keypress"){h=false;event.change="";var d=0;if(g.keyCode!=undefined&&g.keyCode>=20){d=g.keyCode}else{if(g.charCode!=undefined&&g.charCode>=20){d=g.charCode}}if(d!=0){event.change=String.fromCharCode(d)}event.selStart=g.target.selectionStart;event.selEnd=g.target.selectionEnd}if(g.type=="change"){h=false;event.name="Validate";if(g.target.type=="select"){var b=g.target.selectedIndex;console.log(g.target.options[b].value);event.changeEx=g.target.options[b].value}else{if(g.target.type=="radio"||g.target.type=="checkbox"){h=true}event.value=g.target.value}event.willCommit=true}if(g.type=="click"){h=false;event.name="Mouse Up";if(g.target.type!="radio"&&g.target.type!="checkbox"&&g.target.type!="button"){h=true}event.value=g.target.value;if(g.target.type=="checkbox"){if(!g.target.checked){event.value="Off"}}event.willCommit=true}if(g.type=="focus"){h=false;event.name="Focus";if(g.target.type!="radio"&&g.target.type!="checkbox"){g.target.value=c.value}g.target.addEventListener("keystroke",field_event);g.target.addEventListener("blur",field_event)}if(g.type=="blur"){h=false;event.name="Blur";g.target.removeEventListener("keystroke",field_event);g.target.removeEventListener("blur",field_event);if(g.target.type!="radio"&&g.target.type!="checkbox"){g.target.value=c.getFormattedValue()}}if(!h){event.rc=true;do_field_event();if(event.rc==false){if(event.willCommit){if(g.target.type=="checkbox"){g.target.checked=event.value===g.target.value}else{g.target.value=event.target.value}}else{g.preventDefault()}}else{if(event.willCommit){event.target.value=event.value;if(g.target.type=="checkbox"){g.target.checked=event.value===g.target.value}else{g.target.value=event.target.value}do_calculations(c)}}}var a=event.rc;destroy_event();return a}function do_calculate(id,source){if(document.calculate==false){return}var f=init_field(id);if(f==null){return}create_event();event.type="Field";event.name="Calculate";event.targetName=f.name;event.target=f;event.value=f.value;event.source=source;event.willCommit=true;try{eval(f.c)}catch(ex){console.log("do_calculate: "+ex.message)}if(event.rc==true){event.target.value=event.value}destroy_event()}function do_calculations(b){for(var a=0;a<calc_fields.length;a++){do_calculate(calc_fields[a],b)}};
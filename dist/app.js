"use strict";var ServisApp=(()=>{var me=["\u015Eeyh \u015Eamil Mahallesi","Ahi Evran Mahallesi","Eryaman 1. Etap","Eryaman 3. Etap","Elvankent Meydan\u0131","Etimesgut Sanayi","Sincan Otogar","Bat\u0131kent Metro","Mesa Koru","\xDCmitk\xF6y Migros","\xC7ayyolu Caddesi","Ya\u015Famkent","\u0130ncek Kav\u015Fa\u011F\u0131","T\xFCrkkonut","Alacaatl\u0131","Yaprac\u0131k","Ba\u011Fl\u0131ca","Temelli","Yenikent","Fatih Mahallesi"];function I(e){let t=new Set,a=[];for(let s=0;s<e;s++){let n;do n=Math.floor(Math.random()*me.length);while(t.has(n));t.add(n);let i=7+Math.floor(s*.6),r=s*12%60;a.push({id:`stop-${n}`,name:me[n],lat:39.9+Math.random()*.1,lng:32.7+Math.random()*.2,estimatedTime:`${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}`})}return a}var m=[{id:"r1",name:"Etimesgut - Merkez G\xFCzergah",stops:I(6),driverName:"Ahmet \xC7elik",vehiclePlate:"06 ABC 123"},{id:"r2",name:"Sincan - Bat\u0131kent G\xFCzergah",stops:I(5),driverName:"Mustafa Demir",vehiclePlate:"06 DEF 456"},{id:"r3",name:"Eryaman - Elvankent G\xFCzergah",stops:I(7),driverName:"Hasan Y\u0131ld\u0131z",vehiclePlate:"06 GHI 789"},{id:"r4",name:"\xC7ayyolu - \xDCmitk\xF6y G\xFCzergah",stops:I(5),driverName:"Ali Kara",vehiclePlate:"06 JKL 012"},{id:"r5",name:"Ba\u011Fl\u0131ca - Yaprac\u0131k G\xFCzergah",stops:I(4),driverName:"\xD6mer Aksoy",vehiclePlate:"06 MNO 345"}],B=["Elif","Yusuf","Zeynep","Mehmet","Ay\u015Fe","Burak","Defne","Emre","Selin","Kaan","Merve","Arda","Fatma","Can","Sude","Berk","\u0130rem","Ege","Ecrin","Doruk"],R=["Y\u0131lmaz","Kaya","Demir","\xC7elik","\u015Eahin","Arslan","Do\u011Fan","K\u0131l\u0131\xE7","Aslan","Ayd\u0131n","\xD6zdemir","Korkmaz","Erdo\u011Fan","G\xFCne\u015F","Akta\u015F"],$e=["1-A","1-B","2-A","2-B","3-A","3-B","4-A","4-B","5-A","5-B"],u=Array.from({length:30},(e,t)=>{let a=m[t%m.length],s=t===5||t===12||t===23;return{id:`stu-${t+1}`,name:`${B[t%B.length]} ${R[t%R.length]}`,class:$e[t%$e.length],route:a.name,stopName:a.stops[t%a.stops.length]?.name??me[0],isOutsideRoute:s,parentPhone:`(5${30+t}) ${100+t*3}-${4e3+t*7}`}});function De(){let e=Date.now();return[{id:"a1",type:"route_complete",title:"Sabah Seferi Tamamland\u0131",description:"Etimesgut - Merkez g\xFCzergah\u0131 sabah seferi ba\u015Far\u0131yla tamamland\u0131. 28 \xF6\u011Frenci ta\u015F\u0131nd\u0131.",timestamp:new Date(e-25*6e4),icon:"\u2705"},{id:"a2",type:"attendance",title:"Yoklama Al\u0131nd\u0131",description:"3-A s\u0131n\u0131f\u0131 yoklamas\u0131 tamamland\u0131. 24/26 \xF6\u011Frenci mevcut.",timestamp:new Date(e-45*6e4),icon:"\u{1F4CB}"},{id:"a3",type:"driver_rating",title:"\u015Eof\xF6r De\u011Ferlendirmesi",description:"Ahmet \xC7elik i\xE7in yeni bir de\u011Ferlendirme yap\u0131ld\u0131. Ortalama puan: 4.8/5",timestamp:new Date(e-2*36e5),icon:"\u2B50"},{id:"a4",type:"alert",title:"G\xFCzergah D\u0131\u015F\u0131 Uyar\u0131s\u0131",description:"Burak \u015Eahin g\xFCzergah d\u0131\u015F\u0131nda ikamet etmektedir. Veli bilgilendirildi.",timestamp:new Date(e-3*36e5),icon:"\u26A0\uFE0F"},{id:"a5",type:"new_student",title:"Yeni \xD6\u011Frenci Kayd\u0131",description:"Ecrin Akta\u015F, Sincan - Bat\u0131kent g\xFCzergah\u0131na kay\u0131t edildi.",timestamp:new Date(e-5*36e5),icon:"\u{1F195}"},{id:"a6",type:"route_change",title:"Rota G\xFCncellendi",description:"Eryaman - Elvankent g\xFCzergah\u0131na Yaprac\u0131k dura\u011F\u0131 eklendi.",timestamp:new Date(e-8*36e5),icon:"\u{1F504}"},{id:"a7",type:"maintenance",title:"Ara\xE7 Bak\u0131m\u0131",description:"06 GHI 789 plakal\u0131 arac\u0131n periyodik bak\u0131m\u0131 tamamland\u0131.",timestamp:new Date(e-12*36e5),icon:"\u{1F527}"},{id:"a8",type:"route_complete",title:"Ak\u015Fam Seferi Tamamland\u0131",description:"\xC7ayyolu - \xDCmitk\xF6y g\xFCzergah\u0131 ak\u015Fam seferi sorunsuz tamamland\u0131.",timestamp:new Date(e-24*36e5),icon:"\u2705"},{id:"a9",type:"attendance",title:"Haftal\u0131k Yoklama Raporu",description:"Bu haftan\u0131n genel yoklama oran\u0131: %96.2 \u2014 Ge\xE7en haftaya g\xF6re %1.4 art\u0131\u015F.",timestamp:new Date(e-28*36e5),icon:"\u{1F4CA}"},{id:"a10",type:"driver_rating",title:"Ayl\u0131k En \u0130yi \u015Eof\xF6r",description:"Mustafa Demir, 4.9/5 ortalama puan ile ay\u0131n \u015Fof\xF6r\xFC se\xE7ildi.",timestamp:new Date(e-48*36e5),icon:"\u{1F3C6}"},{id:"a11",type:"alert",title:"Trafik Uyar\u0131s\u0131",description:"Bat\u0131kent Metro kav\u015Fa\u011F\u0131nda yo\u011Funluk nedeniyle Sincan g\xFCzergah\u0131nda 8 dk gecikme.",timestamp:new Date(e-52*36e5),icon:"\u{1F6A6}"},{id:"a12",type:"new_student",title:"Toplu Kay\u0131t",description:"Fatih \u0130lkokulu ile anla\u015Fma yap\u0131ld\u0131. 15 yeni \xF6\u011Frenci sisteme eklendi.",timestamp:new Date(e-72*36e5),icon:"\u{1F3EB}"}]}var ue=[{id:"d1",name:"Ahmet \xC7elik",plate:"06 ABC 123",route:"Etimesgut - Merkez",avatar:"A\xC7"},{id:"d2",name:"Mustafa Demir",plate:"06 DEF 456",route:"Sincan - Bat\u0131kent",avatar:"MD"},{id:"d3",name:"Hasan Y\u0131ld\u0131z",plate:"06 GHI 789",route:"Eryaman - Elvankent",avatar:"HY"},{id:"d4",name:"Ali Kara",plate:"06 JKL 012",route:"\xC7ayyolu - \xDCmitk\xF6y",avatar:"AK"},{id:"d5",name:"\xD6mer Aksoy",plate:"06 MNO 345",route:"Ba\u011Fl\u0131ca - Yaprac\u0131k",avatar:"\xD6A"}];function ve(){let e=new Date,t=["active","active","active","idle","returning"];return m.map((a,s)=>({id:`v-${s+1}`,plate:a.vehiclePlate,driverName:a.driverName,routeName:a.name,status:t[s],position:{lat:39.92+Math.random()*.08,lng:32.75+Math.random()*.15,speed:t[s]==="active"?25+Math.floor(Math.random()*35):0,heading:Math.floor(Math.random()*360)},lastUpdate:new Date(e.getTime()-Math.floor(Math.random()*3e5)),studentsOnBoard:t[s]==="active"?12+Math.floor(Math.random()*16):0,capacity:28+Math.floor(Math.random()*8),nextStop:a.stops[Math.floor(Math.random()*a.stops.length)]?.name??"Bilinmiyor",eta:t[s]==="active"?`${3+Math.floor(Math.random()*12)} dk`:"-",fuelLevel:40+Math.floor(Math.random()*55)}))}function Ae(){let e=Date.now();return[{id:"n1",type:"arrival",title:"Servis Yakla\u015F\u0131yor",message:"Elif'in servisi 3 dakika i\xE7inde dura\u011Fa ula\u015Facakt\u0131r.",studentName:"Elif Y\u0131lmaz",parentName:"Ay\u015Fe Y\u0131lmaz",parentPhone:"(532) 100-4000",timestamp:new Date(e-5*6e4),read:!1,priority:"medium"},{id:"n2",type:"departure",title:"Okula Vard\u0131",message:"Yusuf okula g\xFCvenle ula\u015Fm\u0131\u015Ft\u0131r. \u0130yi dersler!",studentName:"Yusuf Kaya",parentName:"Mehmet Kaya",parentPhone:"(533) 103-4007",timestamp:new Date(e-25*6e4),read:!0,priority:"low"},{id:"n3",type:"delay",title:"Servis Gecikmesi",message:"Trafik yo\u011Funlu\u011Fu nedeniyle Zeynep'in servisi yakla\u015F\u0131k 10 dakika gecikecektir.",studentName:"Zeynep Demir",parentName:"Fatma Demir",parentPhone:"(534) 106-4014",timestamp:new Date(e-45*6e4),read:!1,priority:"high"},{id:"n4",type:"absence",title:"Devams\u0131zl\u0131k Bildirimi",message:"Mehmet bug\xFCnk\xFC yoklamada devams\u0131z olarak i\u015Faretlenmi\u015Ftir.",studentName:"Mehmet \xC7elik",parentName:"Ali \xC7elik",parentPhone:"(535) 109-4021",timestamp:new Date(e-2*36e5),read:!0,priority:"medium"},{id:"n5",type:"route_change",title:"G\xFCzergah De\u011Fi\u015Fikli\u011Fi",message:"Ay\u015Fe'nin g\xFCzergah\u0131na Yaprac\u0131k dura\u011F\u0131 eklenmi\u015Ftir. Yeni tahmini var\u0131\u015F: 07:45",studentName:"Ay\u015Fe \u015Eahin",parentName:"Hasan \u015Eahin",parentPhone:"(536) 112-4028",timestamp:new Date(e-4*36e5),read:!1,priority:"medium"},{id:"n6",type:"emergency",title:"Acil Durum Bildirimi",message:"Burak'\u0131n servisinde k\xFC\xE7\xFCk bir ar\u0131za tespit edildi. Yedek ara\xE7 g\xF6nderildi, 15 dk gecikme bekleniyor.",studentName:"Burak Arslan",parentName:"Kemal Arslan",parentPhone:"(537) 115-4035",timestamp:new Date(e-5*36e5),read:!1,priority:"urgent"},{id:"n7",type:"general",title:"Haftal\u0131k Rapor",message:"Defne bu hafta %100 devam oran\u0131 ile t\xFCm seferlere kat\u0131ld\u0131. Tebrikler!",studentName:"Defne Do\u011Fan",parentName:"Sema Do\u011Fan",parentPhone:"(538) 118-4042",timestamp:new Date(e-24*36e5),read:!0,priority:"low"},{id:"n8",type:"arrival",title:"Eve Yakla\u015F\u0131yor",message:"Emre'nin servisi dura\u011Fa 5 dakika i\xE7inde varacakt\u0131r.",studentName:"Emre K\u0131l\u0131\xE7",parentName:"Veli K\u0131l\u0131\xE7",parentPhone:"(539) 121-4049",timestamp:new Date(e-26*36e5),read:!0,priority:"medium"},{id:"n9",type:"delay",title:"Sabah Seferi Gecikmesi",message:"Selin'in sabah seferi yol \xE7al\u0131\u015Fmas\u0131 nedeniyle 7 dakika gecikecektir.",studentName:"Selin Aslan",parentName:"Deniz Aslan",parentPhone:"(540) 124-4056",timestamp:new Date(e-30*36e5),read:!0,priority:"high"},{id:"n10",type:"general",title:"Servis \xDCcreti Hat\u0131rlatma",message:"Kaan'\u0131n Mart ay\u0131 servis \xFCcreti son \xF6deme tarihi 5 Mart't\u0131r.",studentName:"Kaan Ayd\u0131n",parentName:"Selim Ayd\u0131n",parentPhone:"(541) 127-4063",timestamp:new Date(e-48*36e5),read:!1,priority:"low"}]}function we(){return{totalStudents:156,activeRoutes:5,avgAttendance:94.7,totalTripsToday:10,onTimePercentage:91.3,activeVehicles:4,totalDrivers:5,avgDriverRating:4.6}}function Ne(){return[{day:"Pazartesi",present:142,absent:14,total:156},{day:"Sal\u0131",present:148,absent:8,total:156},{day:"\xC7ar\u015Famba",present:145,absent:11,total:156},{day:"Per\u015Fembe",present:150,absent:6,total:156},{day:"Cuma",present:138,absent:18,total:156}]}function Ce(){return[{routeName:"Etimesgut - Merkez",onTimeRate:94.2,avgDelay:2.3,studentCount:28,tripCount:42,satisfaction:4.8},{routeName:"Sincan - Bat\u0131kent",onTimeRate:88.5,avgDelay:4.1,studentCount:32,tripCount:40,satisfaction:4.5},{routeName:"Eryaman - Elvankent",onTimeRate:96.1,avgDelay:1.2,studentCount:35,tripCount:44,satisfaction:4.9},{routeName:"\xC7ayyolu - \xDCmitk\xF6y",onTimeRate:91.7,avgDelay:3,studentCount:30,tripCount:38,satisfaction:4.6},{routeName:"Ba\u011Fl\u0131ca - Yaprac\u0131k",onTimeRate:93.4,avgDelay:2.7,studentCount:31,tripCount:41,satisfaction:4.7}]}var mt=["Ocak","\u015Eubat","Mart","Nisan","May\u0131s"],Se=["paid","paid","paid","pending","overdue","paid","paid","partial","paid","pending"],Me=["credit_card","bank_transfer","cash","auto_debit",null,"credit_card","bank_transfer",null,"auto_debit",null];function ae(){return u.slice(0,20).flatMap((e,t)=>mt.map((a,s)=>{let n=Se[(t+s)%Se.length];return{id:`pay-${t}-${s}`,studentId:e.id,studentName:e.name,parentName:`${B[(t+5)%B.length]} ${R[t%R.length]}`,amount:2500+t%3*500,month:`${a} 2026`,dueDate:`2026-${String(s+1).padStart(2,"0")}-05`,paidDate:n==="paid"?`2026-${String(s+1).padStart(2,"0")}-0${2+t%3}`:n==="partial"?`2026-${String(s+1).padStart(2,"0")}-08`:null,status:n,method:n==="paid"||n==="partial"?Me[t%Me.length]:null,invoiceNo:`SRV-2026-${String(t*5+s+1).padStart(4,"0")}`}}))}function Pe(){return{totalRevenue:39e4,collected:312e3,pending:52e3,overdue:26e3,collectionRate:80}}function ze(){let e=Date.now();return[{id:"ch1",name:"Ahmet \xC7elik (\u015Eof\xF6r)",type:"direct",participants:["admin","Ahmet \xC7elik"],lastMessage:"Sabah seferi sorunsuz tamamland\u0131.",lastMessageTime:new Date(e-10*6e4),unreadCount:0,avatar:"A\xC7"},{id:"ch2",name:"Ay\u015Fe Y\u0131lmaz (Veli)",type:"direct",participants:["admin","Ay\u015Fe Y\u0131lmaz"],lastMessage:"Elif yar\u0131n servise binmeyecek, bilginize.",lastMessageTime:new Date(e-35*6e4),unreadCount:2,avatar:"AY"},{id:"ch3",name:"T\xFCm \u015Eof\xF6rler",type:"group",participants:["admin","Ahmet \xC7elik","Mustafa Demir","Hasan Y\u0131ld\u0131z","Ali Kara","\xD6mer Aksoy"],lastMessage:"Yar\u0131nki yo\u011Fun trafik i\xE7in alternatif rotalar payla\u015F\u0131ld\u0131.",lastMessageTime:new Date(e-2*36e5),unreadCount:0,avatar:"\u{1F68C}"},{id:"ch4",name:"Duyurular",type:"announcement",participants:["admin","all"],lastMessage:"Mart ay\u0131 servis \xFCcretleri 5 Mart son \xF6deme tarihlidir.",lastMessageTime:new Date(e-6*36e5),unreadCount:0,avatar:"\u{1F4E2}"},{id:"ch5",name:"Mehmet Kaya (Veli)",type:"direct",participants:["admin","Mehmet Kaya"],lastMessage:"Yusuf'un adresini g\xFCncellememiz gerekiyor.",lastMessageTime:new Date(e-8*36e5),unreadCount:1,avatar:"MK"},{id:"ch6",name:"Mustafa Demir (\u015Eof\xF6r)",type:"direct",participants:["admin","Mustafa Demir"],lastMessage:"Arac\u0131n sa\u011F aynas\u0131 \xE7izildi, bilginize.",lastMessageTime:new Date(e-12*36e5),unreadCount:0,avatar:"MD"},{id:"ch7",name:"Etimesgut Velileri",type:"group",participants:["admin","Ay\u015Fe Y\u0131lmaz","Ali \xC7elik","Hasan \u015Eahin"],lastMessage:"Pazartesi servis saatleri g\xFCncellendi.",lastMessageTime:new Date(e-24*36e5),unreadCount:3,avatar:"\u{1F468}\u200D\u{1F469}\u200D\u{1F467}"}]}function Be(e){let t=Date.now();return{ch1:[{id:"m1",channelId:"ch1",sender:"Ahmet \xC7elik",senderRole:"driver",senderAvatar:"A\xC7",text:"G\xFCnayd\u0131n, sabah seferine ba\u015Fl\u0131yorum.",timestamp:new Date(t-3*36e5),read:!0},{id:"m2",channelId:"ch1",sender:"Y\xF6netici",senderRole:"admin",senderAvatar:"YN",text:"G\xFCnayd\u0131n Ahmet bey, dikkatli olun. Eryaman kav\u015Fa\u011F\u0131nda \xE7al\u0131\u015Fma var.",timestamp:new Date(t-2.5*36e5),read:!0},{id:"m3",channelId:"ch1",sender:"Ahmet \xC7elik",senderRole:"driver",senderAvatar:"A\xC7",text:"Te\u015Fekk\xFCrler, alternatif rotadan gidece\u011Fim.",timestamp:new Date(t-2*36e5),read:!0},{id:"m4",channelId:"ch1",sender:"Ahmet \xC7elik",senderRole:"driver",senderAvatar:"A\xC7",text:"Sabah seferi sorunsuz tamamland\u0131.",timestamp:new Date(t-10*6e4),read:!0}],ch2:[{id:"m5",channelId:"ch2",sender:"Ay\u015Fe Y\u0131lmaz",senderRole:"parent",senderAvatar:"AY",text:"Merhaba, Elif yar\u0131n doktor randevusu nedeniyle servise binmeyecek.",timestamp:new Date(t-40*6e4),read:!0},{id:"m6",channelId:"ch2",sender:"Y\xF6netici",senderRole:"admin",senderAvatar:"YN",text:"Anla\u015F\u0131ld\u0131, \u015Fof\xF6r\xFC bilgilendirece\u011Fim. Ge\xE7mi\u015F olsun.",timestamp:new Date(t-38*6e4),read:!0},{id:"m7",channelId:"ch2",sender:"Ay\u015Fe Y\u0131lmaz",senderRole:"parent",senderAvatar:"AY",text:"Elif yar\u0131n servise binmeyecek, bilginize.",timestamp:new Date(t-35*6e4),read:!1},{id:"m8",channelId:"ch2",sender:"Ay\u015Fe Y\u0131lmaz",senderRole:"parent",senderAvatar:"AY",text:"Bir de Mart ay\u0131 \xFCcretini hangi hesaba yat\u0131raca\u011F\u0131z?",timestamp:new Date(t-34*6e4),read:!1}],ch5:[{id:"m9",channelId:"ch5",sender:"Mehmet Kaya",senderRole:"parent",senderAvatar:"MK",text:"Merhaba, Yusuf'un adresini g\xFCncelledik. Yeni adres: Bat\u0131kent 3. Cadde No:42",timestamp:new Date(t-8*36e5),read:!1}]}[e]??[{id:`mg-${e}`,channelId:e,sender:"Sistem",senderRole:"admin",senderAvatar:"\u{1F916}",text:"Bu kanalda hen\xFCz mesaj bulunmuyor.",timestamp:new Date(t-24*36e5),read:!0}]}var Re={periodic:"Periyodik Bak\u0131m",repair:"Onar\u0131m",tire:"Lastik",brake:"Fren",oil:"Ya\u011F De\u011Fi\u015Fimi",inspection:"Muayene",cleaning:"Temizlik"},y=["Ankara Oto Servis","G\xFCvenli Fren Ltd.","MasterTire","FleetCare Pro","H\u0131zl\u0131 Bak\u0131m"];function xe(){let e=m.map(t=>t.vehiclePlate);return[{id:"mt1",vehicleId:"v-1",vehiclePlate:e[0],type:"periodic",description:"50.000 km periyodik bak\u0131m - filtre, ya\u011F, kay\u0131\u015F kontrol\xFC",status:"completed",scheduledDate:"2026-02-10",completedDate:"2026-02-10",cost:4500,vendor:y[0],priority:"medium",nextDue:"2026-05-10",odometer:50120},{id:"mt2",vehicleId:"v-2",vehiclePlate:e[1],type:"tire",description:"4 adet k\u0131\u015F lasti\u011Fi de\u011Fi\u015Fimi",status:"completed",scheduledDate:"2026-01-15",completedDate:"2026-01-15",cost:8200,vendor:y[2],priority:"high",nextDue:"2026-11-01",odometer:42300},{id:"mt3",vehicleId:"v-3",vehiclePlate:e[2],type:"brake",description:"\xD6n fren balatalar\u0131 ve diskler de\u011Fi\u015Fimi",status:"in_progress",scheduledDate:"2026-02-23",completedDate:null,cost:3200,vendor:y[1],priority:"urgent",nextDue:null,odometer:67800},{id:"mt4",vehicleId:"v-4",vehiclePlate:e[3],type:"inspection",description:"Y\u0131ll\u0131k ara\xE7 muayenesi",status:"scheduled",scheduledDate:"2026-03-05",completedDate:null,cost:1200,vendor:y[3],priority:"high",nextDue:null,odometer:38500},{id:"mt5",vehicleId:"v-5",vehiclePlate:e[4],type:"oil",description:"Motor ya\u011F\u0131 ve filtre de\u011Fi\u015Fimi",status:"completed",scheduledDate:"2026-02-01",completedDate:"2026-02-01",cost:1800,vendor:y[0],priority:"medium",nextDue:"2026-05-01",odometer:55200},{id:"mt6",vehicleId:"v-1",vehiclePlate:e[0],type:"cleaning",description:"\u0130\xE7-d\u0131\u015F detayl\u0131 temizlik ve dezenfeksiyon",status:"completed",scheduledDate:"2026-02-17",completedDate:"2026-02-17",cost:650,vendor:y[4],priority:"low",nextDue:"2026-03-03",odometer:50280},{id:"mt7",vehicleId:"v-2",vehiclePlate:e[1],type:"repair",description:"Sa\u011F yan ayna de\u011Fi\u015Fimi - hasar onar\u0131m\u0131",status:"scheduled",scheduledDate:"2026-02-25",completedDate:null,cost:950,vendor:y[0],priority:"medium",nextDue:null,odometer:42580},{id:"mt8",vehicleId:"v-3",vehiclePlate:e[2],type:"periodic",description:"60.000 km kapsaml\u0131 bak\u0131m",status:"scheduled",scheduledDate:"2026-03-15",completedDate:null,cost:6200,vendor:y[3],priority:"medium",nextDue:null,odometer:67800},{id:"mt9",vehicleId:"v-4",vehiclePlate:e[3],type:"cleaning",description:"Haftal\u0131k i\xE7 temizlik",status:"completed",scheduledDate:"2026-02-20",completedDate:"2026-02-20",cost:350,vendor:y[4],priority:"low",nextDue:"2026-02-27",odometer:38600},{id:"mt10",vehicleId:"v-5",vehiclePlate:e[4],type:"repair",description:"Klima kompres\xF6r tamiri",status:"completed",scheduledDate:"2026-01-28",completedDate:"2026-01-30",cost:5400,vendor:y[0],priority:"high",nextDue:null,odometer:54800}]}var Ee=["A+","A-","B+","B-","AB+","AB-","0+","0-"],Le=["\u015Eeyh \u015Eamil Mah. 5. Cad. No:12","Ahi Evran Mah. Bulvar Sk. No:8/3","Eryaman 1. Etap 4. Cad. No:22","Elvankent Mah. Y\u0131ld\u0131z Sk. No:15","Bat\u0131kent 3. Cad. No:42/A","Mesa Koru Sitesi B Blok D:8","\xDCmitk\xF6y Mah. 2. Cad. No:31","\xC7ayyolu 8. Cad. No:19/2","Ya\u015Famkent Mah. Park Sk. No:7","\u0130ncek Lale Sitesi No:3"],Te=["","","F\u0131st\u0131k alerjisi","","","Laktoz intolerans\u0131","","Ar\u0131 sokmas\u0131 alerjisi","","","","Gluten hassasiyeti","","",""];function He(){return u.map((e,t)=>{let a=m[t%m.length];return{id:e.id,name:e.name,className:e.class,routeId:a.id,routeName:a.name,stopName:e.stopName,parentName:`${B[(t+5)%B.length]} ${R[t%R.length]}`,parentPhone:e.parentPhone,parentEmail:`${e.name.split(" ")[0].toLowerCase().replace(/[İıÖöÜüŞşÇçĞğ]/g,s=>({\u0130:"i",\u0131:"i",\u00D6:"o",\u00F6:"o",\u00DC:"u",\u00FC:"u",\u015E:"s",\u015F:"s",\u00C7:"c",\u00E7:"c",\u011E:"g",\u011F:"g"})[s]??s)}@email.com`,address:Le[t%Le.length],bloodType:Ee[t%Ee.length],allergies:Te[t%Te.length],emergencyContact:`(5${50+t}) ${200+t}-${5e3+t*3}`,enrollmentDate:`2025-09-${String(1+t%15).padStart(2,"0")}`,isActive:t!==7&&t!==19,photoInitials:e.name.split(" ").map(s=>s[0]).join(""),notes:t===3?"\xD6\u011Fleden sonra servise binmiyor":t===11?"Cuma g\xFCnleri yar\u0131m g\xFCn":""}})}function c(e){return document.querySelector(e)}function ut(e,t,a){let s=document.createElement(e);return t&&Object.entries(t).forEach(([n,i])=>{n==="className"?s.className=i:n==="innerHTML"?s.innerHTML=i:s.setAttribute(n,i)}),a&&a.forEach(n=>{typeof n=="string"?s.appendChild(document.createTextNode(n)):s.appendChild(n)}),s}function E(e){let a=new Date().getTime()-e.getTime(),s=Math.floor(a/6e4),n=Math.floor(a/36e5),i=Math.floor(a/864e5);return s<1?"Az \xF6nce":s<60?`${s} dakika \xF6nce`:n<24?`${n} saat \xF6nce`:i<7?`${i} g\xFCn \xF6nce`:e.toLocaleDateString("tr-TR")}function qe(e){return e.toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric",weekday:"long"})}function l(e,t="info"){let a={success:"\u2705",error:"\u274C",warning:"\u26A0\uFE0F",info:"\u2139\uFE0F"},s={success:"#4caf50",error:"#e53935",warning:"#ff9800",info:"#1a3a5f"},n=ut("div",{className:"sp-toast",innerHTML:`<span class="sp-toast-icon">${a[t]}</span><span>${e}</span>`});n.style.cssText=`
    position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(20px);
    background:${s[t]};color:#fff;padding:0.85rem 1.5rem;border-radius:10px;
    box-shadow:0 6px 20px rgba(0,0,0,0.25);z-index:10001;display:flex;align-items:center;
    gap:0.6rem;font-size:0.95rem;opacity:0;transition:all 0.3s;max-width:90%;
    font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
  `,document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) translateY(20px)",setTimeout(()=>n.remove(),300)},3500)}var d={step:"select-start",selectedRoute:null,startStop:null,endStop:null,time:null,history:[]};function L(){let e=m.find(t=>t.id===d.selectedRoute);return e?e.stops:m.flatMap(t=>t.stops)}function ge(e){d.history.push(d.step),d.step=e}function vt(){let e=d.history.pop();e&&(d.step==="confirm"&&(d.time=null),d.step==="select-time"&&(d.endStop=null),d.step==="select-end"&&(d.startStop=null),d.step=e,x())}function Ge(){d.step="select-start",d.selectedRoute=null,d.startStop=null,d.endStop=null,d.time=null,d.history=[],x(),l("Rota planlamas\u0131 iptal edildi.","warning")}function gt(){let e=[{key:"select-start",label:"Ba\u015Flang\u0131\xE7"},{key:"select-end",label:"Var\u0131\u015F"},{key:"select-time",label:"Saat"},{key:"confirm",label:"Onay"}],t=e.findIndex(a=>a.key===d.step);return`<div class="sp-steps">
    ${e.map((a,s)=>`
      <div class="sp-step ${s<t?"completed":""} ${s===t?"active":""}">
        <div class="sp-step-num">${s<t?"\u2713":s+1}</div>
        <div class="sp-step-label">${a.label}</div>
      </div>
      ${s<e.length-1?'<div class="sp-step-line '+(s<t?"completed":"")+'"></div>':""}
    `).join("")}
  </div>`}function ft(){return`<div class="sp-planner-controls">
    ${d.history.length>0?'<button class="sp-btn sp-btn-outline" id="rpBack">\u2190 Geri</button>':"<div></div>"}
    <button class="sp-btn sp-btn-danger" id="rpCancel">\u2715 \u0130ptal Et</button>
  </div>`}function yt(){return`
    <h4>G\xFCzergah & Ba\u015Flang\u0131\xE7 Dura\u011F\u0131 Se\xE7in</h4>
    <div class="sp-form-group">
      <label class="sp-label">G\xFCzergah</label>
      <div class="sp-radio-group">${m.map(t=>`<label class="sp-radio-card">
      <input type="radio" name="route" value="${t.id}" ${d.selectedRoute===t.id?"checked":""}>
      <div class="sp-radio-body">
        <strong>${t.name}</strong>
        <small>${t.stops.length} durak \xB7 \u015Eof\xF6r: ${t.driverName} \xB7 ${t.vehiclePlate}</small>
      </div>
    </label>`).join("")}</div>
    </div>
    <div class="sp-form-group" id="rpStartStops" style="${d.selectedRoute?"":"display:none"}">
      <label class="sp-label">Ba\u015Flang\u0131\xE7 Dura\u011F\u0131</label>
      <select class="sp-select" id="rpStartSelect">
        <option value="">Durak se\xE7in...</option>
      </select>
    </div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-primary" id="rpNextStart" disabled>Devam Et \u2192</button>
    </div>`}function ht(){let t=L().filter(s=>s.id!==d.startStop).map(s=>`<option value="${s.id}" ${s.id===d.endStop?"selected":""}>${s.name} (${s.estimatedTime})</option>`).join("");return`
    <h4>Var\u0131\u015F Dura\u011F\u0131 Se\xE7in</h4>
    <div class="sp-info-box">\u{1F4CD} Ba\u015Flang\u0131\xE7: <strong>${L().find(s=>s.id===d.startStop)?.name??""}</strong></div>
    <div class="sp-form-group">
      <label class="sp-label">Var\u0131\u015F Dura\u011F\u0131</label>
      <select class="sp-select" id="rpEndSelect">
        <option value="">Durak se\xE7in...</option>
        ${t}
      </select>
    </div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-primary" id="rpNextEnd" disabled>Devam Et \u2192</button>
    </div>`}function bt(){let t=["06:30","07:00","07:30","08:00","08:30","12:00","13:00","15:30","16:00","16:30","17:00","17:30"].map(a=>`<button class="sp-time-chip ${d.time===a?"selected":""}" data-time="${a}">${a}</button>`).join("");return`
    <h4>Sefer Saati Se\xE7in</h4>
    <div class="sp-info-box">\u{1F4CD} ${L().find(a=>a.id===d.startStop)?.name} \u2192 ${L().find(a=>a.id===d.endStop)?.name}</div>
    <div class="sp-time-grid">${t}</div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-primary" id="rpNextTime" disabled>Devam Et \u2192</button>
    </div>`}function kt(){let e=m.find(s=>s.id===d.selectedRoute),t=L().find(s=>s.id===d.startStop)?.name??"",a=L().find(s=>s.id===d.endStop)?.name??"";return`
    <h4>Rota Onay\u0131</h4>
    <div class="sp-confirm-card">
      <div class="sp-confirm-row"><span>G\xFCzergah:</span><strong>${e?.name}</strong></div>
      <div class="sp-confirm-row"><span>\u015Eof\xF6r:</span><strong>${e?.driverName}</strong></div>
      <div class="sp-confirm-row"><span>Ara\xE7:</span><strong>${e?.vehiclePlate}</strong></div>
      <div class="sp-confirm-row"><span>Ba\u015Flang\u0131\xE7:</span><strong>${t}</strong></div>
      <div class="sp-confirm-row"><span>Var\u0131\u015F:</span><strong>${a}</strong></div>
      <div class="sp-confirm-row"><span>Saat:</span><strong>${d.time}</strong></div>
    </div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-success" id="rpConfirm">\u2713 Rotay\u0131 Onayla</button>
    </div>`}function x(){let e=c("#routePlannerContent");if(!e)return;let t=gt();switch(d.step){case"select-start":t+=yt();break;case"select-end":t+=ht();break;case"select-time":t+=bt();break;case"confirm":t+=kt();break}t+=ft(),e.innerHTML=t,$t()}function $t(){let e=c("#rpBack"),t=c("#rpCancel");if(e?.addEventListener("click",vt),t?.addEventListener("click",Ge),d.step==="select-start"){document.querySelectorAll('input[name="route"]').forEach(n=>{n.addEventListener("change",()=>{d.selectedRoute=n.value;let i=c("#rpStartStops"),r=c("#rpStartSelect");if(i&&(i.style.display=""),r){let o=L();r.innerHTML='<option value="">Durak se\xE7in...</option>'+o.map(p=>`<option value="${p.id}">${p.name} (${p.estimatedTime})</option>`).join("")}})});let a=c("#rpStartSelect"),s=c("#rpNextStart");a?.addEventListener("change",()=>{d.startStop=a.value||null,s&&(s.disabled=!d.startStop)}),s?.addEventListener("click",()=>{d.startStop&&(ge("select-end"),x())})}if(d.step==="select-end"){let a=c("#rpEndSelect"),s=c("#rpNextEnd");a?.addEventListener("change",()=>{d.endStop=a.value||null,s&&(s.disabled=!d.endStop)}),s?.addEventListener("click",()=>{d.endStop&&(ge("select-time"),x())})}d.step==="select-time"&&(document.querySelectorAll(".sp-time-chip").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".sp-time-chip").forEach(i=>i.classList.remove("selected")),s.classList.add("selected"),d.time=s.dataset.time??null;let n=c("#rpNextTime");n&&(n.disabled=!1)})}),c("#rpNextTime")?.addEventListener("click",()=>{d.time&&(ge("confirm"),x())})),d.step==="confirm"&&c("#rpConfirm")?.addEventListener("click",()=>{l("Rota ba\u015Far\u0131yla onayland\u0131!","success"),Ge()})}function Ye(){c("#routePlannerContent")&&x()}var Fe={route_complete:"#4caf50",attendance:"#2196f3",new_student:"#9c27b0",driver_rating:"#ff9800",route_change:"#00bcd4",alert:"#e53935",maintenance:"#607d8b"},St={route_complete:"Sefer",attendance:"Yoklama",new_student:"Kay\u0131t",driver_rating:"De\u011Ferlendirme",route_change:"G\xFCzergah",alert:"Uyar\u0131",maintenance:"Bak\u0131m"};function Ie(){let e=c("#activitiesContent");if(!e)return;let t=De(),a=`
    <div class="sp-activity-filters">
      <button class="sp-filter-btn active" data-filter="all">T\xFCm\xFC</button>
      <button class="sp-filter-btn" data-filter="route_complete">Seferler</button>
      <button class="sp-filter-btn" data-filter="attendance">Yoklama</button>
      <button class="sp-filter-btn" data-filter="alert">Uyar\u0131lar</button>
      <button class="sp-filter-btn" data-filter="driver_rating">De\u011Ferlendirme</button>
    </div>`;function s(n){let i=n==="all"?t:t.filter(r=>r.type===n);return i.length===0?'<div class="sp-empty-state">Bu kategoride aktivite bulunamad\u0131.</div>':i.map(r=>`
      <div class="sp-activity-item" data-type="${r.type}">
        <div class="sp-activity-icon" style="background:${Fe[r.type]??"#757575"}">${r.icon}</div>
        <div class="sp-activity-body">
          <div class="sp-activity-header">
            <strong>${r.title}</strong>
            <span class="sp-activity-badge" style="background:${Fe[r.type]??"#757575"}">${St[r.type]??""}</span>
          </div>
          <p>${r.description}</p>
          <small>${E(r.timestamp)}</small>
        </div>
      </div>
    `).join("")}e.innerHTML=a+`<div class="sp-activity-list" id="activityList">${s("all")}</div>`,e.querySelectorAll(".sp-filter-btn").forEach(n=>{n.addEventListener("click",()=>{e.querySelectorAll(".sp-filter-btn").forEach(r=>r.classList.remove("active")),n.classList.add("active");let i=e.querySelector("#activityList");i&&(i.innerHTML=s(n.dataset.filter??"all"))})})}var h=new Map,se="all",ne="";function D(){return u.filter(e=>{let t=se==="all"||e.class===se,a=!ne||e.name.toLowerCase().includes(ne.toLowerCase());return t&&a})}function Mt(){return[...new Set(u.map(e=>e.class))].sort()}function je(){let e=D(),t=e.filter(n=>h.get(n.id)===!0).length,a=e.filter(n=>h.get(n.id)===!1).length,s=e.length-t-a;return{total:e.length,present:t,absent:a,unmarked:s}}function T(){let e=c("#attendanceContent");if(!e)return;let t=Mt(),a=je(),s=D(),n=qe(new Date),i=a.total>0?Math.round(a.present/a.total*100):0;e.innerHTML=`
    <div class="sp-attendance-header">
      <div class="sp-attendance-date">\u{1F4C5} ${n}</div>
      <div class="sp-attendance-stats-bar">
        <div class="sp-att-stat sp-att-present"><span>${a.present}</span> Mevcut</div>
        <div class="sp-att-stat sp-att-absent"><span>${a.absent}</span> Yok</div>
        <div class="sp-att-stat sp-att-unmarked"><span>${a.unmarked}</span> Bekliyor</div>
        <div class="sp-att-stat sp-att-pct"><span>%${i}</span> Kat\u0131l\u0131m</div>
      </div>
    </div>

    <div class="sp-attendance-toolbar">
      <div class="sp-att-filters">
        <select class="sp-select sp-select-sm" id="attClassFilter">
          <option value="all">T\xFCm S\u0131n\u0131flar</option>
          ${t.map(r=>`<option value="${r}" ${r===se?"selected":""}>${r}</option>`).join("")}
        </select>
        <input type="text" class="sp-input sp-input-sm" id="attSearch" placeholder="\xD6\u011Frenci ara..." value="${ne}">
      </div>
      <div class="sp-att-bulk">
        <button class="sp-btn sp-btn-sm sp-btn-success" id="attMarkAllPresent">T\xFCm\xFC Mevcut</button>
        <button class="sp-btn sp-btn-sm sp-btn-danger" id="attMarkAllAbsent">T\xFCm\xFC Yok</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="attReset">S\u0131f\u0131rla</button>
      </div>
    </div>

    <div class="sp-attendance-list">
      ${s.length===0?'<div class="sp-empty-state">\xD6\u011Frenci bulunamad\u0131.</div>':""}
      ${s.map(r=>{let o=h.get(r.id),p=o===!0,ke=o===!1;return`
          <div class="sp-att-row ${p?"present":""} ${ke?"absent":""} ${r.isOutsideRoute?"outside-route":""}">
            <div class="sp-att-student">
              <div class="sp-att-avatar">${r.name.split(" ").map(pt=>pt[0]).join("")}</div>
              <div class="sp-att-info">
                <strong>${r.name}</strong>
                <small>${r.class} \xB7 ${r.stopName}</small>
                ${r.isOutsideRoute?'<span class="sp-att-warning">\u26A0\uFE0F G\xFCzergah d\u0131\u015F\u0131</span>':""}
              </div>
            </div>
            <div class="sp-att-actions">
              <button class="sp-att-btn present ${p?"active":""}" data-id="${r.id}" data-action="present" title="Mevcut">\u2713</button>
              <button class="sp-att-btn absent ${ke?"active":""}" data-id="${r.id}" data-action="absent" title="Yok">\u2715</button>
            </div>
          </div>`}).join("")}
    </div>

    <div class="sp-attendance-footer">
      <button class="sp-btn sp-btn-primary sp-btn-lg" id="attSave">\u{1F4CB} Yoklamay\u0131 Kaydet</button>
    </div>`,Et(e)}function Et(e){e.querySelector("#attClassFilter")?.addEventListener("change",t=>{se=t.target.value,T()}),e.querySelector("#attSearch")?.addEventListener("input",t=>{ne=t.target.value,T()}),e.querySelectorAll(".sp-att-btn").forEach(t=>{t.addEventListener("click",()=>{let a=t.dataset.id,s=t.dataset.action,n=h.get(a);if(s==="present"&&n===!0||s==="absent"&&n===!1)h.delete(a);else{h.set(a,s==="present");let i=u.find(r=>r.id===a);i?.isOutsideRoute&&s==="present"&&l(`\u26A0\uFE0F ${i.name} g\xFCzergah d\u0131\u015F\u0131nda ikamet etmektedir. Veli ile ileti\u015Fime ge\xE7ilmesi \xF6nerilir.`,"warning")}T()})}),e.querySelector("#attMarkAllPresent")?.addEventListener("click",()=>{D().forEach(a=>h.set(a.id,!0));let t=D().filter(a=>a.isOutsideRoute);t.length>0&&l(`\u26A0\uFE0F ${t.length} \xF6\u011Frenci g\xFCzergah d\u0131\u015F\u0131nda ikamet ediyor. Listede i\u015Faretlendi.`,"warning"),T()}),e.querySelector("#attMarkAllAbsent")?.addEventListener("click",()=>{D().forEach(t=>h.set(t.id,!1)),T()}),e.querySelector("#attReset")?.addEventListener("click",()=>{D().forEach(t=>h.delete(t.id)),T()}),e.querySelector("#attSave")?.addEventListener("click",()=>{let t=je();if(t.unmarked>0){l(`${t.unmarked} \xF6\u011Frencinin yoklamas\u0131 hen\xFCz i\u015Faretlenmedi.`,"warning");return}let a=D().map(s=>({studentId:s.id,date:new Date().toISOString().split("T")[0],present:h.get(s.id)??!1}));console.log("Yoklama kaydedildi:",a),l(`Yoklama ba\u015Far\u0131yla kaydedildi! ${t.present} mevcut, ${t.absent} devams\u0131z.`,"success")})}function Oe(){T()}var A=[{key:"safety",label:"G\xFCvenli S\xFCr\xFC\u015F",icon:"\u{1F6E1}\uFE0F"},{key:"punctuality",label:"Dakiklik",icon:"\u23F0"},{key:"friendliness",label:"\u0130leti\u015Fim & Samimiyet",icon:"\u{1F60A}"},{key:"driving",label:"S\xFCr\xFC\u015F Kalitesi",icon:"\u{1F68C}"},{key:"cleanliness",label:"Ara\xE7 Temizli\u011Fi",icon:"\u2728"}],H="",v={},j="",ye=!1;function Lt(e,t){return Array.from({length:5},(a,s)=>`<span class="sp-star ${s<t?"filled":""}" data-criterion="${e}" data-value="${s+1}">\u2605</span>`).join("")}function O(){let e=c("#surveyOverlay");if(!e)return;if(!ye){e.style.display="none";return}e.style.display="flex";let t=e.querySelector(".sp-survey-content");if(!t)return;let a=ue.map(i=>`<option value="${i.id}" ${i.id===H?"selected":""}>${i.name} \u2014 ${i.route} (${i.plate})</option>`).join(""),s=H&&A.every(i=>(v[i.key]??0)>0),n=A.length>0?(A.reduce((i,r)=>i+(v[r.key]??0),0)/A.length).toFixed(1):"0.0";t.innerHTML=`
    <div class="sp-survey-header">
      <h3>\u015Eof\xF6r De\u011Ferlendirme Anketi</h3>
      <button class="sp-survey-close" id="surveyClose">&times;</button>
    </div>
    <div class="sp-survey-body">
      <p class="sp-survey-desc">Bu anket iste\u011Fe ba\u011Fl\u0131d\u0131r. \u015Eof\xF6rlerimizi de\u011Ferlendirerek hizmet kalitemizi art\u0131rmam\u0131za yard\u0131mc\u0131 olabilirsiniz.</p>
      <div class="sp-form-group">
        <label class="sp-label">\u015Eof\xF6r Se\xE7in</label>
        <select class="sp-select" id="surveyDriverSelect">
          <option value="">\u015Eof\xF6r se\xE7in...</option>
          ${a}
        </select>
      </div>
      ${H?`
        <div class="sp-survey-criteria">
          ${A.map(i=>`
            <div class="sp-criterion">
              <div class="sp-criterion-label">${i.icon} ${i.label}</div>
              <div class="sp-stars">${Lt(i.key,v[i.key]??0)}</div>
              <div class="sp-criterion-value">${v[i.key]?v[i.key]+"/5":"-"}</div>
            </div>
          `).join("")}
        </div>
        <div class="sp-survey-avg">Ortalama Puan: <strong>${n}</strong>/5</div>
        <div class="sp-form-group">
          <label class="sp-label">Yorumunuz (\u0130ste\u011Fe ba\u011Fl\u0131)</label>
          <textarea class="sp-textarea" id="surveyComment" placeholder="\u015Eof\xF6r hakk\u0131ndaki g\xF6r\xFC\u015Flerinizi yazabilirsiniz..." rows="3">${j}</textarea>
        </div>
        <button class="sp-btn sp-btn-primary sp-btn-lg" id="surveySubmit" ${s?"":"disabled"}>
          De\u011Ferlendirmeyi G\xF6nder
        </button>
      `:'<div class="sp-empty-state">De\u011Ferlendirmek istedi\u011Finiz \u015Fof\xF6r\xFC se\xE7in.</div>'}
    </div>`,Tt(e)}function Tt(e){e.querySelector("#surveyClose")?.addEventListener("click",fe),e.addEventListener("click",t=>{t.target.classList.contains("sp-survey-overlay")&&fe()}),e.querySelector("#surveyDriverSelect")?.addEventListener("change",t=>{H=t.target.value,A.forEach(a=>delete v[a.key]),j="",O()}),e.querySelectorAll(".sp-star").forEach(t=>{t.addEventListener("click",()=>{let a=t.dataset.criterion,s=parseInt(t.dataset.value,10);v[a]=s,O()})}),e.querySelector("#surveyComment")?.addEventListener("input",t=>{j=t.target.value}),e.querySelector("#surveySubmit")?.addEventListener("click",()=>{let t=ue.find(s=>s.id===H);if(!t)return;let a={driverId:t.id,driverName:t.name,ratings:{safety:v.safety??0,punctuality:v.punctuality??0,friendliness:v.friendliness??0,driving:v.driving??0,cleanliness:v.cleanliness??0},comment:j,date:new Date().toISOString().split("T")[0]};console.log("Anket g\xF6nderildi:",a),l(`${t.name} i\xE7in de\u011Ferlendirmeniz kaydedildi. Te\u015Fekk\xFCrler!`,"success"),fe(),H="",A.forEach(s=>delete v[s.key]),j=""})}function fe(){ye=!1,O()}function Dt(){ye=!0,O()}function Ve(){document.querySelectorAll('[data-action="open-survey"]').forEach(e=>{e.addEventListener("click",Dt)}),O()}function Ke(){let e=c("#demoRequestForm");e&&e.addEventListener("submit",t=>{t.preventDefault();let a=new FormData(e),s={fullName:a.get("demoName"),email:a.get("demoEmail"),phone:a.get("demoPhone"),company:a.get("demoCompany"),studentCount:a.get("demoStudentCount"),serviceType:a.get("demoServiceType"),message:a.get("demoMessage")};console.log("Demo talebi:",s),l("Demo talebiniz al\u0131nd\u0131! Ekibimiz en k\u0131sa s\xFCrede sizinle ileti\u015Fime ge\xE7ecek.","success"),e.reset()})}function _e(){let e=c("#contactMapContainer");e&&!e.querySelector("iframe")&&(e.innerHTML=`
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.5!2d32.6!3d39.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU3JzAwLjAiTiAzMsKwMzYnMDAuMCJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
        width="100%" height="250" style="border:0;border-radius:10px;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
    `)}function Ue(){let e=c("#routeCheckContent");if(!e)return;let t=u.filter(a=>a.isOutsideRoute);if(t.length===0){e.innerHTML='<div class="sp-empty-state">T\xFCm \xF6\u011Frenciler g\xFCzergah dahilinde.</div>';return}e.innerHTML=`
    <div class="sp-route-check-alert">
      <div class="sp-alert-banner warning">
        \u26A0\uFE0F <strong>${t.length} \xF6\u011Frenci</strong> kay\u0131tl\u0131 g\xFCzergah d\u0131\u015F\u0131nda ikamet etmektedir.
      </div>
      <div class="sp-outside-list">
        ${t.map(a=>`
          <div class="sp-outside-card">
            <div class="sp-outside-info">
              <div class="sp-att-avatar">${a.name.split(" ").map(s=>s[0]).join("")}</div>
              <div>
                <strong>${a.name}</strong>
                <small>${a.class} \xB7 ${a.route}</small>
                <small>Durak: ${a.stopName}</small>
              </div>
            </div>
            <div class="sp-outside-actions">
              <button class="sp-btn sp-btn-sm sp-btn-outline" data-notify="${a.id}">\u{1F4F1} Veli Bilgilendir</button>
              <button class="sp-btn sp-btn-sm sp-btn-primary" data-reassign="${a.id}">\u{1F504} G\xFCzergah Ata</button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>`,e.querySelectorAll("[data-notify]").forEach(a=>{a.addEventListener("click",()=>{let s=u.find(n=>n.id===a.dataset.notify);s&&(l(`${s.name}'in velisine (${s.parentPhone}) bilgilendirme mesaj\u0131 g\xF6nderildi.`,"success"),a.textContent="\u2713 Bilgilendirildi",a.disabled=!0)})}),e.querySelectorAll("[data-reassign]").forEach(a=>{a.addEventListener("click",()=>{let s=u.find(n=>n.id===a.dataset.reassign);s&&l(`${s.name} i\xE7in yeni g\xFCzergah atama i\u015Flemi ba\u015Flat\u0131ld\u0131.`,"info")})})}var g=[],w=null,S="all",At=null;function Ze(e){return{active:"Seferde",idle:"Beklemede",maintenance:"Bak\u0131mda",returning:"D\xF6n\xFC\u015Fte"}[e]??e}function V(e){return{active:"#4caf50",idle:"#ff9800",maintenance:"#e53935",returning:"#2196f3"}[e]??"#757575"}function wt(){return S==="all"?g:g.filter(e=>e.status===S)}function Nt(e){let t=Math.floor((Date.now()-e.getTime())/1e3);return t<60?`${t} sn \xF6nce`:`${Math.floor(t/60)} dk \xF6nce`}function Ct(e){let t=w===e.id,a=Math.round(e.studentsOnBoard/e.capacity*100),s=e.fuelLevel>50?"#4caf50":e.fuelLevel>25?"#ff9800":"#e53935";return`
    <div class="vt-card ${t?"selected":""}" data-vehicle="${e.id}">
      <div class="vt-card-header">
        <div class="vt-plate">
          <span class="vt-status-dot" style="background:${V(e.status)}"></span>
          <strong>${e.plate}</strong>
        </div>
        <span class="vt-status-badge" style="background:${V(e.status)}20;color:${V(e.status)}">${Ze(e.status)}</span>
      </div>
      <div class="vt-card-body">
        <div class="vt-info-row"><span>\u015Eof\xF6r:</span><strong>${e.driverName}</strong></div>
        <div class="vt-info-row"><span>G\xFCzergah:</span><strong>${e.routeName}</strong></div>
        <div class="vt-info-row"><span>H\u0131z:</span><strong>${e.position.speed} km/s</strong></div>
        <div class="vt-info-row"><span>Sonraki Durak:</span><strong>${e.nextStop}</strong></div>
        <div class="vt-info-row"><span>Tahmini Var\u0131\u015F:</span><strong>${e.eta}</strong></div>
        <div class="vt-progress-row">
          <span>Yolcu (${e.studentsOnBoard}/${e.capacity})</span>
          <div class="vt-progress-bar">
            <div class="vt-progress-fill" style="width:${a}%;background:${a>85?"#e53935":"#4caf50"}"></div>
          </div>
        </div>
        <div class="vt-progress-row">
          <span>Yak\u0131t (%${e.fuelLevel})</span>
          <div class="vt-progress-bar">
            <div class="vt-progress-fill" style="width:${e.fuelLevel}%;background:${s}"></div>
          </div>
        </div>
        <div class="vt-update-time">Son g\xFCncelleme: ${Nt(e.lastUpdate)}</div>
      </div>
    </div>`}function Pt(){let e=w?g.find(i=>i.id===w):null;if(!e)return`
      <div class="vt-map-placeholder">
        <div class="vt-map-icon">\u{1F5FA}\uFE0F</div>
        <p>Harita g\xF6r\xFCnt\xFCs\xFC i\xE7in bir ara\xE7 se\xE7in</p>
        <small>Sol panelden bir araca t\u0131klayarak konum bilgilerini g\xF6r\xFCnt\xFCleyebilirsiniz</small>
      </div>`;let t=12,a=Math.round((e.position.lat-39.9)/.1*(t-1)),s=Math.round((e.position.lng-32.75)/.15*(t-1)),n="";for(let i=0;i<t;i++)for(let r=0;r<t;r++){let o=i===t-1-a&&r===s;n+=`<div class="vt-grid-cell ${o?"vehicle":""}">${o?"\u{1F68C}":""}</div>`}return`
    <div class="vt-map-detail">
      <div class="vt-map-header">
        <h4>\u{1F4CD} ${e.plate} - ${e.driverName}</h4>
        <span class="vt-status-badge" style="background:${V(e.status)}20;color:${V(e.status)}">${Ze(e.status)}</span>
      </div>
      <div class="vt-mini-map">
        <div class="vt-grid">${n}</div>
      </div>
      <div class="vt-coords">
        <div class="vt-coord-item"><span>Enlem:</span><strong>${e.position.lat.toFixed(4)}\xB0</strong></div>
        <div class="vt-coord-item"><span>Boylam:</span><strong>${e.position.lng.toFixed(4)}\xB0</strong></div>
        <div class="vt-coord-item"><span>Y\xF6n:</span><strong>${e.position.heading}\xB0</strong></div>
        <div class="vt-coord-item"><span>H\u0131z:</span><strong>${e.position.speed} km/s</strong></div>
      </div>
      <div class="vt-map-actions">
        <button class="sp-btn sp-btn-sm sp-btn-primary" id="vtSendMessage" data-id="${e.id}">\u{1F4AC} \u015Eof\xF6re Mesaj</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="vtShowRoute" data-id="${e.id}">\u{1F5FA}\uFE0F G\xFCzergah\u0131 G\xF6ster</button>
      </div>
    </div>`}function K(){let e=c("#vehicleTrackingContent");if(!e)return;let t=wt(),a=g.filter(i=>i.status==="active").length,s=g.reduce((i,r)=>i+r.studentsOnBoard,0),n=g.filter(i=>i.status==="active").reduce((i,r)=>i+r.position.speed,0)/(a||1);e.innerHTML=`
    <div class="vt-summary">
      <div class="vt-summary-card"><span class="vt-summary-num">${g.length}</span><span>Toplam Ara\xE7</span></div>
      <div class="vt-summary-card active"><span class="vt-summary-num">${a}</span><span>Seferde</span></div>
      <div class="vt-summary-card"><span class="vt-summary-num">${s}</span><span>Yolcu</span></div>
      <div class="vt-summary-card"><span class="vt-summary-num">${Math.round(n)} km/s</span><span>Ort. H\u0131z</span></div>
    </div>

    <div class="vt-toolbar">
      <select class="sp-select sp-select-sm" id="vtStatusFilter">
        <option value="all" ${S==="all"?"selected":""}>T\xFCm Ara\xE7lar</option>
        <option value="active" ${S==="active"?"selected":""}>Seferde</option>
        <option value="idle" ${S==="idle"?"selected":""}>Beklemede</option>
        <option value="returning" ${S==="returning"?"selected":""}>D\xF6n\xFC\u015Fte</option>
        <option value="maintenance" ${S==="maintenance"?"selected":""}>Bak\u0131mda</option>
      </select>
      <button class="sp-btn sp-btn-sm sp-btn-primary" id="vtRefresh">\u{1F504} Yenile</button>
    </div>

    <div class="vt-layout">
      <div class="vt-vehicle-list">
        ${t.length===0?'<div class="sp-empty-state">Bu filtre ile e\u015Fle\u015Fen ara\xE7 yok.</div>':""}
        ${t.map(i=>Ct(i)).join("")}
      </div>
      <div class="vt-map-area">
        ${Pt()}
      </div>
    </div>`,zt(e)}function zt(e){e.querySelector("#vtStatusFilter")?.addEventListener("change",t=>{S=t.target.value,K()}),e.querySelector("#vtRefresh")?.addEventListener("click",()=>{Bt(),l("Ara\xE7 konumlar\u0131 g\xFCncellendi.","info")}),e.querySelectorAll(".vt-card").forEach(t=>{t.addEventListener("click",()=>{let a=t.dataset.vehicle;w=w===a?null:a,K()})}),e.querySelector("#vtSendMessage")?.addEventListener("click",()=>{let t=g.find(a=>a.id===w);t&&l(`${t.driverName} \u015Fof\xF6re mesaj g\xF6nderildi.`,"success")}),e.querySelector("#vtShowRoute")?.addEventListener("click",()=>{let t=g.find(a=>a.id===w);t&&l(`${t.routeName} g\xFCzergah\u0131 haritada g\xF6steriliyor.`,"info")})}function Bt(){g=ve(),K()}function Je(){g=ve(),K(),At=setInterval(()=>{g.forEach(t=>{t.status==="active"&&(t.position.lat+=(Math.random()-.5)*.002,t.position.lng+=(Math.random()-.5)*.002,t.position.speed=Math.max(0,t.position.speed+Math.floor((Math.random()-.5)*10)),t.lastUpdate=new Date)}),c("#panel-vehicle-tracking")?.classList.contains("active")&&K()},1e4)}var k=[],b="all",C="all",q="";function Rt(e){return{arrival:"Var\u0131\u015F",departure:"Kalk\u0131\u015F",delay:"Gecikme",absence:"Devams\u0131zl\u0131k",route_change:"G\xFCzergah",emergency:"Acil",general:"Genel"}[e]??e}function xt(e){return{arrival:"\u{1F68C}",departure:"\u{1F3EB}",delay:"\u23F0",absence:"\u274C",route_change:"\u{1F504}",emergency:"\u{1F6A8}",general:"\u{1F4E2}"}[e]??"\u{1F4CB}"}function Ht(e){return{low:"D\xFC\u015F\xFCk",medium:"Orta",high:"Y\xFCksek",urgent:"Acil"}[e]??e}function Qe(e){return{low:"#4caf50",medium:"#2196f3",high:"#ff9800",urgent:"#e53935"}[e]??"#757575"}function qt(){return k.filter(e=>{let t=b==="all"||e.type===b,a=C==="all"||e.priority===C,s=!q||e.title.toLowerCase().includes(q.toLowerCase())||e.studentName.toLowerCase().includes(q.toLowerCase())||e.parentName.toLowerCase().includes(q.toLowerCase());return t&&a&&s})}function N(){let e=c("#notificationsContent");if(!e)return;let t=qt(),a=k.filter(n=>!n.read).length,s=k.filter(n=>n.priority==="urgent"&&!n.read).length;e.innerHTML=`
    <div class="pn-summary">
      <div class="pn-summary-card"><span class="pn-summary-num">${k.length}</span><span>Toplam Bildirim</span></div>
      <div class="pn-summary-card unread"><span class="pn-summary-num">${a}</span><span>Okunmam\u0131\u015F</span></div>
      <div class="pn-summary-card urgent"><span class="pn-summary-num">${s}</span><span>Acil</span></div>
    </div>

    <div class="pn-toolbar">
      <div class="pn-filters">
        <select class="sp-select sp-select-sm" id="pnTypeFilter">
          <option value="all">T\xFCm T\xFCrler</option>
          <option value="arrival" ${b==="arrival"?"selected":""}>Var\u0131\u015F</option>
          <option value="departure" ${b==="departure"?"selected":""}>Kalk\u0131\u015F</option>
          <option value="delay" ${b==="delay"?"selected":""}>Gecikme</option>
          <option value="absence" ${b==="absence"?"selected":""}>Devams\u0131zl\u0131k</option>
          <option value="route_change" ${b==="route_change"?"selected":""}>G\xFCzergah</option>
          <option value="emergency" ${b==="emergency"?"selected":""}>Acil</option>
          <option value="general" ${b==="general"?"selected":""}>Genel</option>
        </select>
        <select class="sp-select sp-select-sm" id="pnPriorityFilter">
          <option value="all">T\xFCm \xD6ncelikler</option>
          <option value="urgent" ${C==="urgent"?"selected":""}>Acil</option>
          <option value="high" ${C==="high"?"selected":""}>Y\xFCksek</option>
          <option value="medium" ${C==="medium"?"selected":""}>Orta</option>
          <option value="low" ${C==="low"?"selected":""}>D\xFC\u015F\xFCk</option>
        </select>
        <input type="text" class="sp-input sp-input-sm" id="pnSearch" placeholder="Bildirim ara..." value="${q}">
      </div>
      <div class="pn-actions">
        <button class="sp-btn sp-btn-sm sp-btn-primary" id="pnMarkAllRead">\u2713 T\xFCm\xFCn\xFC Oku</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="pnNewNotification">+ Yeni Bildirim</button>
      </div>
    </div>

    <div class="pn-list">
      ${t.length===0?'<div class="sp-empty-state">Bu filtre ile e\u015Fle\u015Fen bildirim yok.</div>':""}
      ${t.map(n=>`
        <div class="pn-item ${n.read?"read":"unread"} priority-${n.priority}" data-id="${n.id}">
          <div class="pn-item-icon">${xt(n.type)}</div>
          <div class="pn-item-content">
            <div class="pn-item-header">
              <strong>${n.title}</strong>
              <div class="pn-item-meta">
                <span class="pn-type-badge" style="background:${Qe(n.priority)}20;color:${Qe(n.priority)}">${Ht(n.priority)}</span>
                <span class="pn-type-badge outline">${Rt(n.type)}</span>
              </div>
            </div>
            <p class="pn-item-message">${n.message}</p>
            <div class="pn-item-footer">
              <span>\u{1F464} ${n.studentName}</span>
              <span>\u{1F468}\u200D\u{1F469}\u200D\u{1F467} ${n.parentName}</span>
              <span>\u{1F4DE} ${n.parentPhone}</span>
              <span>\u{1F550} ${E(n.timestamp)}</span>
            </div>
          </div>
          <div class="pn-item-actions">
            <button class="pn-action-btn" data-action="toggle-read" data-id="${n.id}" title="${n.read?"Okunmad\u0131 \u0130\u015Faretle":"Okundu \u0130\u015Faretle"}">
              ${n.read?"\u{1F4ED}":"\u{1F4EC}"}
            </button>
            <button class="pn-action-btn" data-action="resend" data-id="${n.id}" title="Tekrar G\xF6nder">\u{1F4E4}</button>
            <button class="pn-action-btn delete" data-action="delete" data-id="${n.id}" title="Sil">\u{1F5D1}\uFE0F</button>
          </div>
        </div>
      `).join("")}
    </div>`,Gt(e)}function Gt(e){e.querySelector("#pnTypeFilter")?.addEventListener("change",t=>{b=t.target.value,N()}),e.querySelector("#pnPriorityFilter")?.addEventListener("change",t=>{C=t.target.value,N()}),e.querySelector("#pnSearch")?.addEventListener("input",t=>{q=t.target.value,N()}),e.querySelector("#pnMarkAllRead")?.addEventListener("click",()=>{k.forEach(t=>t.read=!0),l("T\xFCm bildirimler okundu olarak i\u015Faretlendi.","success"),N()}),e.querySelector("#pnNewNotification")?.addEventListener("click",()=>{Yt()}),e.querySelectorAll(".pn-action-btn").forEach(t=>{t.addEventListener("click",a=>{a.stopPropagation();let s=t.dataset.action,n=t.dataset.id,i=k.find(r=>r.id===n);i&&(s==="toggle-read"?(i.read=!i.read,l(i.read?"Bildirim okundu olarak i\u015Faretlendi.":"Bildirim okunmad\u0131 olarak i\u015Faretlendi.","info")):s==="resend"?l(`"${i.title}" bildirimi ${i.parentName} velisine tekrar g\xF6nderildi.`,"success"):s==="delete"&&(k=k.filter(r=>r.id!==n),l("Bildirim silindi.","warning")),N())})})}function Yt(){let e=document.createElement("div");e.className="pn-modal-overlay",e.innerHTML=`
    <div class="pn-modal">
      <div class="pn-modal-header">
        <h3>Yeni Bildirim G\xF6nder</h3>
        <button class="pn-modal-close" id="pnModalClose">\u2715</button>
      </div>
      <form id="pnNewForm" class="pn-modal-body">
        <div class="sp-form-row">
          <div class="sp-form-group">
            <label class="sp-label">Bildirim T\xFCr\xFC *</label>
            <select class="sp-select" name="type" required>
              <option value="general">Genel</option>
              <option value="arrival">Var\u0131\u015F</option>
              <option value="departure">Kalk\u0131\u015F</option>
              <option value="delay">Gecikme</option>
              <option value="absence">Devams\u0131zl\u0131k</option>
              <option value="route_change">G\xFCzergah De\u011Fi\u015Fikli\u011Fi</option>
              <option value="emergency">Acil Durum</option>
            </select>
          </div>
          <div class="sp-form-group">
            <label class="sp-label">\xD6ncelik *</label>
            <select class="sp-select" name="priority" required>
              <option value="low">D\xFC\u015F\xFCk</option>
              <option value="medium" selected>Orta</option>
              <option value="high">Y\xFCksek</option>
              <option value="urgent">Acil</option>
            </select>
          </div>
        </div>
        <div class="sp-form-group">
          <label class="sp-label">Ba\u015Fl\u0131k *</label>
          <input class="sp-input" type="text" name="title" required placeholder="Bildirim ba\u015Fl\u0131\u011F\u0131">
        </div>
        <div class="sp-form-group">
          <label class="sp-label">Mesaj *</label>
          <textarea class="sp-input" name="message" rows="3" required placeholder="Bildirim mesaj\u0131"></textarea>
        </div>
        <div class="sp-form-row">
          <div class="sp-form-group">
            <label class="sp-label">\xD6\u011Frenci Ad\u0131 *</label>
            <input class="sp-input" type="text" name="studentName" required>
          </div>
          <div class="sp-form-group">
            <label class="sp-label">Veli Ad\u0131 *</label>
            <input class="sp-input" type="text" name="parentName" required>
          </div>
        </div>
        <div class="pn-modal-footer">
          <button type="button" class="sp-btn sp-btn-outline" id="pnModalCancel">\u0130ptal</button>
          <button type="submit" class="sp-btn sp-btn-primary">\u{1F4E4} G\xF6nder</button>
        </div>
      </form>
    </div>`,document.body.appendChild(e),requestAnimationFrame(()=>e.classList.add("active"));let t=()=>{e.classList.remove("active"),setTimeout(()=>e.remove(),300)};e.querySelector("#pnModalClose")?.addEventListener("click",t),e.querySelector("#pnModalCancel")?.addEventListener("click",t),e.addEventListener("click",a=>{a.target===e&&t()}),e.querySelector("#pnNewForm")?.addEventListener("submit",a=>{a.preventDefault();let s=a.target,n=new FormData(s),i={id:`n-${Date.now()}`,type:n.get("type"),title:n.get("title"),message:n.get("message"),studentName:n.get("studentName"),parentName:n.get("parentName"),parentPhone:"-",timestamp:new Date,read:!1,priority:n.get("priority")};k.unshift(i),l("Bildirim ba\u015Far\u0131yla g\xF6nderildi!","success"),t(),N()})}function We(){k=Ae(),N()}var _="overview";function Ft(){let e=we();return`
    <div class="rp-stats-grid">
      <div class="rp-stat-card blue">
        <div class="rp-stat-icon">\u{1F393}</div>
        <div class="rp-stat-value">${e.totalStudents}</div>
        <div class="rp-stat-label">Toplam \xD6\u011Frenci</div>
      </div>
      <div class="rp-stat-card green">
        <div class="rp-stat-icon">\u{1F6E3}\uFE0F</div>
        <div class="rp-stat-value">${e.activeRoutes}</div>
        <div class="rp-stat-label">Aktif G\xFCzergah</div>
      </div>
      <div class="rp-stat-card yellow">
        <div class="rp-stat-icon">\u{1F4CA}</div>
        <div class="rp-stat-value">%${e.avgAttendance}</div>
        <div class="rp-stat-label">Ort. Devam</div>
      </div>
      <div class="rp-stat-card purple">
        <div class="rp-stat-icon">\u{1F68C}</div>
        <div class="rp-stat-value">${e.totalTripsToday}</div>
        <div class="rp-stat-label">Bug\xFCnk\xFC Sefer</div>
      </div>
      <div class="rp-stat-card teal">
        <div class="rp-stat-icon">\u23F1\uFE0F</div>
        <div class="rp-stat-value">%${e.onTimePercentage}</div>
        <div class="rp-stat-label">Zaman\u0131nda</div>
      </div>
      <div class="rp-stat-card orange">
        <div class="rp-stat-icon">\u{1F697}</div>
        <div class="rp-stat-value">${e.activeVehicles}</div>
        <div class="rp-stat-label">Aktif Ara\xE7</div>
      </div>
      <div class="rp-stat-card navy">
        <div class="rp-stat-icon">\u{1F468}\u200D\u2708\uFE0F</div>
        <div class="rp-stat-value">${e.totalDrivers}</div>
        <div class="rp-stat-label">Toplam \u015Eof\xF6r</div>
      </div>
      <div class="rp-stat-card gold">
        <div class="rp-stat-icon">\u2B50</div>
        <div class="rp-stat-value">${e.avgDriverRating}</div>
        <div class="rp-stat-label">Ort. Puan</div>
      </div>
    </div>

    <div class="rp-quick-insights">
      <h4>\u{1F4A1} H\u0131zl\u0131 Bilgiler</h4>
      <div class="rp-insights-grid">
        <div class="rp-insight-card good">
          <span class="rp-insight-icon">\u{1F4C8}</span>
          <div>
            <strong>Devam Oran\u0131 Art\u0131\u015Fta</strong>
            <p>Bu hafta devam oran\u0131 ge\xE7en haftaya g\xF6re %1.4 artt\u0131.</p>
          </div>
        </div>
        <div class="rp-insight-card warning">
          <span class="rp-insight-icon">\u26A0\uFE0F</span>
          <div>
            <strong>Gecikme Uyar\u0131s\u0131</strong>
            <p>Sincan - Bat\u0131kent g\xFCzergah\u0131nda ortalama 4.1 dk gecikme var.</p>
          </div>
        </div>
        <div class="rp-insight-card good">
          <span class="rp-insight-icon">\u{1F3C6}</span>
          <div>
            <strong>En \u0130yi G\xFCzergah</strong>
            <p>Eryaman - Elvankent g\xFCzergah\u0131 %96.1 zaman\u0131nda var\u0131\u015F oran\u0131 ile lider.</p>
          </div>
        </div>
        <div class="rp-insight-card info">
          <span class="rp-insight-icon">\u{1F527}</span>
          <div>
            <strong>Bak\u0131m Plan\u0131</strong>
            <p>06 GHI 789 plakal\u0131 arac\u0131n periyodik bak\u0131m tarihi yakla\u015F\u0131yor.</p>
          </div>
        </div>
      </div>
    </div>`}function It(){let e=Ne(),t=Math.max(...e.map(a=>a.total));return`
    <div class="rp-chart-section">
      <h4>\u{1F4CA} Haftal\u0131k Devam Grafi\u011Fi</h4>
      <div class="rp-bar-chart">
        ${e.map(a=>{let s=a.present/t*100,n=a.absent/t*100,i=Math.round(a.present/a.total*100);return`
            <div class="rp-bar-group">
              <div class="rp-bar-label">${a.day.substring(0,3)}</div>
              <div class="rp-bar-stack">
                <div class="rp-bar present" style="height:${s}%" title="${a.present} mevcut"></div>
                <div class="rp-bar absent" style="height:${n}%" title="${a.absent} devams\u0131z"></div>
              </div>
              <div class="rp-bar-value">%${i}</div>
            </div>`}).join("")}
      </div>
      <div class="rp-chart-legend">
        <span class="rp-legend-item"><span class="rp-legend-color present"></span>Mevcut</span>
        <span class="rp-legend-item"><span class="rp-legend-color absent"></span>Devams\u0131z</span>
      </div>
    </div>

    <div class="rp-table-section">
      <h4>\u{1F4CB} G\xFCnl\xFCk Detay</h4>
      <table class="rp-table">
        <thead>
          <tr>
            <th>G\xFCn</th>
            <th>Mevcut</th>
            <th>Devams\u0131z</th>
            <th>Toplam</th>
            <th>Devam Oran\u0131</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(a=>{let s=Math.round(a.present/a.total*100),n=s>=95?"#4caf50":s>=90?"#ff9800":"#e53935";return`
              <tr>
                <td><strong>${a.day}</strong></td>
                <td style="color:#4caf50">${a.present}</td>
                <td style="color:#e53935">${a.absent}</td>
                <td>${a.total}</td>
                <td><span class="rp-rate-badge" style="background:${n}20;color:${n}">%${s}</span></td>
              </tr>`}).join("")}
        </tbody>
      </table>
    </div>`}function jt(){let e=Ce();return`
    <div class="rp-routes-section">
      <h4>\u{1F6E3}\uFE0F G\xFCzergah Performans\u0131</h4>
      <div class="rp-route-cards">
        ${e.map(t=>{let a=t.onTimeRate>=95?"#4caf50":t.onTimeRate>=90?"#ff9800":"#e53935",s=Array.from({length:5},(n,i)=>`<span style="color:${i<Math.round(t.satisfaction)?"#ffc107":"#ddd"}">\u2605</span>`).join("");return`
            <div class="rp-route-card">
              <div class="rp-route-header">
                <strong>${t.routeName}</strong>
                <span class="rp-rate-badge" style="background:${a}20;color:${a}">%${t.onTimeRate}</span>
              </div>
              <div class="rp-route-stats">
                <div class="rp-route-stat">
                  <span>\xD6\u011Frenci</span>
                  <strong>${t.studentCount}</strong>
                </div>
                <div class="rp-route-stat">
                  <span>Sefer</span>
                  <strong>${t.tripCount}</strong>
                </div>
                <div class="rp-route-stat">
                  <span>Ort. Gecikme</span>
                  <strong>${t.avgDelay} dk</strong>
                </div>
                <div class="rp-route-stat">
                  <span>Memnuniyet</span>
                  <strong>${s}</strong>
                </div>
              </div>
              <div class="rp-route-bar">
                <div class="rp-route-bar-fill" style="width:${t.onTimeRate}%;background:${a}"></div>
              </div>
            </div>`}).join("")}
      </div>
    </div>

    <div class="rp-comparison">
      <h4>\u{1F4CA} G\xFCzergah Kar\u015F\u0131la\u015Ft\u0131rmas\u0131</h4>
      <table class="rp-table">
        <thead>
          <tr>
            <th>G\xFCzergah</th>
            <th>Zaman\u0131nda %</th>
            <th>Ort. Gecikme</th>
            <th>\xD6\u011Frenci</th>
            <th>Sefer</th>
            <th>Memnuniyet</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(t=>{let a=t.onTimeRate>=95?"#4caf50":t.onTimeRate>=90?"#ff9800":"#e53935";return`
              <tr>
                <td><strong>${t.routeName}</strong></td>
                <td><span class="rp-rate-badge" style="background:${a}20;color:${a}">%${t.onTimeRate}</span></td>
                <td>${t.avgDelay} dk</td>
                <td>${t.studentCount}</td>
                <td>${t.tripCount}</td>
                <td>\u2B50 ${t.satisfaction}</td>
              </tr>`}).join("")}
        </tbody>
      </table>
    </div>`}function Xe(){let e=c("#reportingContent");if(!e)return;let t=`
    <div class="rp-sub-tabs">
      <button class="rp-sub-tab ${_==="overview"?"active":""}" data-tab="overview">\u{1F4CA} Genel Bak\u0131\u015F</button>
      <button class="rp-sub-tab ${_==="attendance"?"active":""}" data-tab="attendance">\u{1F4CB} Devam Raporu</button>
      <button class="rp-sub-tab ${_==="routes"?"active":""}" data-tab="routes">\u{1F6E3}\uFE0F G\xFCzergah Raporu</button>
    </div>
    <div class="rp-sub-content">`;switch(_){case"overview":t+=Ft();break;case"attendance":t+=It();break;case"routes":t+=jt();break}t+=`</div>
    <div class="rp-export-bar">
      <button class="sp-btn sp-btn-sm sp-btn-outline" id="rpExportPDF">\u{1F4C4} PDF \u0130ndir</button>
      <button class="sp-btn sp-btn-sm sp-btn-outline" id="rpExportExcel">\u{1F4CA} Excel \u0130ndir</button>
      <button class="sp-btn sp-btn-sm sp-btn-primary" id="rpPrint">\u{1F5A8}\uFE0F Yazd\u0131r</button>
    </div>`,e.innerHTML=t,Ot(e)}function Ot(e){e.querySelectorAll(".rp-sub-tab").forEach(t=>{t.addEventListener("click",()=>{_=t.dataset.tab,Xe()})}),e.querySelector("#rpExportPDF")?.addEventListener("click",()=>{l("Rapor PDF olarak haz\u0131rlan\u0131yor...","info")}),e.querySelector("#rpExportExcel")?.addEventListener("click",()=>{l("Rapor Excel olarak haz\u0131rlan\u0131yor...","info")}),e.querySelector("#rpPrint")?.addEventListener("click",()=>{l("Yazd\u0131rma penceresi a\xE7\u0131l\u0131yor...","info")})}function et(){Xe()}var J=[],P="all",ie="all",G="";function U(e){return e.toLocaleString("tr-TR")}function Vt(e){return{paid:"\xD6dendi",pending:"Bekliyor",overdue:"Gecikmi\u015F",partial:"K\u0131smi"}[e]}function tt(e){return{paid:"#4caf50",pending:"#ff9800",overdue:"#e53935",partial:"#2196f3"}[e]}function Kt(e){return e?{credit_card:"\u{1F4B3} Kredi Kart\u0131",bank_transfer:"\u{1F3E6} Havale/EFT",cash:"\u{1F4B5} Nakit",auto_debit:"\u{1F504} Otomatik"}[e]:"-"}function _t(){return J.filter(e=>{let t=P==="all"||e.status===P,a=ie==="all"||e.month===ie,s=!G||e.studentName.toLowerCase().includes(G.toLowerCase())||e.parentName.toLowerCase().includes(G.toLowerCase())||e.invoiceNo.toLowerCase().includes(G.toLowerCase());return t&&a&&s})}function Ut(){return[...new Set(J.map(e=>e.month))]}function Z(){let e=c("#paymentsContent");if(!e)return;let t=Pe(),a=_t(),s=Ut();e.innerHTML=`
    <div class="pm-summary">
      <div class="pm-sum-card green"><div class="pm-sum-icon">\u{1F4B0}</div><div class="pm-sum-val">\u20BA${U(t.totalRevenue)}</div><div class="pm-sum-lbl">Toplam Gelir</div></div>
      <div class="pm-sum-card blue"><div class="pm-sum-icon">\u2705</div><div class="pm-sum-val">\u20BA${U(t.collected)}</div><div class="pm-sum-lbl">Tahsil Edilen</div></div>
      <div class="pm-sum-card orange"><div class="pm-sum-icon">\u23F3</div><div class="pm-sum-val">\u20BA${U(t.pending)}</div><div class="pm-sum-lbl">Bekleyen</div></div>
      <div class="pm-sum-card red"><div class="pm-sum-icon">\u26A0\uFE0F</div><div class="pm-sum-val">\u20BA${U(t.overdue)}</div><div class="pm-sum-lbl">Gecikmi\u015F</div></div>
      <div class="pm-sum-card purple"><div class="pm-sum-icon">\u{1F4CA}</div><div class="pm-sum-val">%${t.collectionRate}</div><div class="pm-sum-lbl">Tahsilat Oran\u0131</div></div>
    </div>
    <div class="pm-toolbar">
      <div class="pm-filters">
        <select class="sp-select sp-select-sm" id="pmStatusFilter">
          <option value="all">T\xFCm Durumlar</option>
          <option value="paid" ${P==="paid"?"selected":""}>\xD6dendi</option>
          <option value="pending" ${P==="pending"?"selected":""}>Bekliyor</option>
          <option value="overdue" ${P==="overdue"?"selected":""}>Gecikmi\u015F</option>
          <option value="partial" ${P==="partial"?"selected":""}>K\u0131smi</option>
        </select>
        <select class="sp-select sp-select-sm" id="pmMonthFilter">
          <option value="all">T\xFCm Aylar</option>
          ${s.map(n=>`<option value="${n}" ${ie===n?"selected":""}>${n}</option>`).join("")}
        </select>
        <input type="text" class="sp-input sp-input-sm" id="pmSearch" placeholder="\xD6\u011Frenci, veli veya fatura ara..." value="${G}">
      </div>
      <div class="pm-actions">
        <button class="sp-btn sp-btn-sm sp-btn-primary" id="pmNewInvoice">+ Fatura Olu\u015Ftur</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="pmExport">\u{1F4CA} D\u0131\u015Fa Aktar</button>
      </div>
    </div>
    <div class="pm-table-wrap">
      <table class="rp-table pm-table">
        <thead><tr><th>Fatura No</th><th>\xD6\u011Frenci</th><th>Veli</th><th>Ay</th><th>Tutar</th><th>Son \xD6deme</th><th>Durum</th><th>\xD6deme Y\xF6ntemi</th><th>\u0130\u015Flem</th></tr></thead>
        <tbody>
          ${a.length===0?'<tr><td colspan="9" style="text-align:center;color:var(--gray);padding:2rem;">Kay\u0131t bulunamad\u0131.</td></tr>':""}
          ${a.slice(0,30).map(n=>`
            <tr class="pm-row-${n.status}">
              <td><code>${n.invoiceNo}</code></td>
              <td><strong>${n.studentName}</strong></td>
              <td>${n.parentName}</td>
              <td>${n.month}</td>
              <td><strong>\u20BA${U(n.amount)}</strong></td>
              <td>${n.dueDate}</td>
              <td><span class="rp-rate-badge" style="background:${tt(n.status)}20;color:${tt(n.status)}">${Vt(n.status)}</span></td>
              <td>${Kt(n.method)}</td>
              <td>
                ${n.status!=="paid"?`<button class="sp-btn sp-btn-sm sp-btn-success pm-pay-btn" data-id="${n.id}">\u{1F4B3} Tahsil</button>`:'<span style="color:#4caf50">\u2713</span>'}
                <button class="sp-btn sp-btn-sm sp-btn-outline pm-remind-btn" data-id="${n.id}" title="Hat\u0131rlatma G\xF6nder">\u{1F4E9}</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    ${a.length>30?`<div style="text-align:center;color:var(--gray);font-size:0.85rem;margin-top:1rem;">ve ${a.length-30} kay\u0131t daha...</div>`:""}`,Zt(e)}function Zt(e){e.querySelector("#pmStatusFilter")?.addEventListener("change",t=>{P=t.target.value,Z()}),e.querySelector("#pmMonthFilter")?.addEventListener("change",t=>{ie=t.target.value,Z()}),e.querySelector("#pmSearch")?.addEventListener("input",t=>{G=t.target.value,Z()}),e.querySelector("#pmNewInvoice")?.addEventListener("click",()=>l("Yeni fatura olu\u015Fturma formu a\xE7\u0131l\u0131yor...","info")),e.querySelector("#pmExport")?.addEventListener("click",()=>l("\xD6deme raporu haz\u0131rlan\u0131yor...","info")),e.querySelectorAll(".pm-pay-btn").forEach(t=>{t.addEventListener("click",()=>{let a=J.find(s=>s.id===t.dataset.id);a&&(a.status="paid",a.paidDate=new Date().toISOString().split("T")[0],a.method="credit_card",l(`${a.invoiceNo} numaral\u0131 fatura tahsil edildi.`,"success"),Z())})}),e.querySelectorAll(".pm-remind-btn").forEach(t=>{t.addEventListener("click",()=>{let a=J.find(s=>s.id===t.dataset.id);a&&l(`${a.parentName} velisine \xF6deme hat\u0131rlatmas\u0131 g\xF6nderildi.`,"info")})})}function at(){J=ae(),Z()}var re=null;function he(){let e=c("#parentPortalContent");e&&(re?Qt(e):Jt(e))}function Jt(e){e.innerHTML=`
    <div class="pp-welcome">
      <div class="pp-welcome-icon">\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}</div>
      <h4>Veli Portal\u0131na Ho\u015F Geldiniz</h4>
      <p>\xC7ocu\u011Funuzun servis bilgilerini, yoklama durumunu ve \xF6deme detaylar\u0131n\u0131 buradan takip edebilirsiniz.</p>
      <div class="pp-student-grid">
        ${u.slice(0,12).map(t=>{let a=m.find(s=>s.name===t.route);return`
            <div class="pp-student-card" data-id="${t.id}">
              <div class="pp-student-avatar">${t.name.split(" ").map(s=>s[0]).join("")}</div>
              <strong>${t.name}</strong>
              <small>${t.class} \xB7 ${a?.name.split(" - ")[0]??""}</small>
            </div>`}).join("")}
      </div>
      <p style="color:var(--gray);font-size:0.8rem;margin-top:1rem;">Demo ama\xE7l\u0131 bir \xF6\u011Frenci se\xE7erek veli portal\u0131n\u0131 deneyimleyin.</p>
    </div>`,e.querySelectorAll(".pp-student-card").forEach(t=>{t.addEventListener("click",()=>{re=t.dataset.id,he()})})}function Qt(e){let t=u.find(p=>p.id===re);if(!t)return;let a=m.find(p=>p.name===t.route),s=ae().filter(p=>p.studentId===t.id),n=s.filter(p=>p.status==="paid").length,i=s.find(p=>p.status==="pending"||p.status==="overdue"),r=[{day:"Pazartesi",status:"present"},{day:"Sal\u0131",status:"present"},{day:"\xC7ar\u015Famba",status:"present"},{day:"Per\u015Fembe",status:"absent"},{day:"Cuma",status:"present"}],o=Math.round(r.filter(p=>p.status==="present").length/r.length*100);e.innerHTML=`
    <div class="pp-header">
      <button class="sp-btn sp-btn-sm sp-btn-outline" id="ppBack">\u2190 Geri</button>
      <div class="pp-student-info">
        <div class="pp-lg-avatar">${t.name.split(" ").map(p=>p[0]).join("")}</div>
        <div>
          <h4>${t.name}</h4>
          <span>${t.class} \xB7 ${t.route}</span>
        </div>
      </div>
    </div>

    <div class="pp-grid">
      <div class="pp-card">
        <h5>\u{1F68C} Servis Durumu</h5>
        <div class="pp-live-status">
          <div class="pp-status-dot active"></div>
          <span>Servis Seferde</span>
        </div>
        <div class="pp-detail-rows">
          <div><span>G\xFCzergah:</span><strong>${a?.name??"-"}</strong></div>
          <div><span>\u015Eof\xF6r:</span><strong>${a?.driverName??"-"}</strong></div>
          <div><span>Plaka:</span><strong>${a?.vehiclePlate??"-"}</strong></div>
          <div><span>Durak:</span><strong>${t.stopName}</strong></div>
          <div><span>Tahmini Var\u0131\u015F:</span><strong class="pp-eta">~${5+Math.floor(Math.random()*10)} dakika</strong></div>
        </div>
        <button class="sp-btn sp-btn-sm sp-btn-primary pp-full-width" id="ppTrackBus">\u{1F4CD} Servisi Canl\u0131 Takip Et</button>
      </div>

      <div class="pp-card">
        <h5>\u{1F4CB} Bu Hafta Yoklama</h5>
        <div class="pp-attendance-week">
          ${r.map(p=>`
            <div class="pp-att-day ${p.status}">
              <span class="pp-att-icon">${p.status==="present"?"\u2713":"\u2715"}</span>
              <span>${p.day.substring(0,3)}</span>
            </div>
          `).join("")}
        </div>
        <div class="pp-att-summary">
          <span>Haftal\u0131k Devam: <strong>%${o}</strong></span>
          <span>Ayl\u0131k Devam: <strong>%94</strong></span>
        </div>
      </div>

      <div class="pp-card">
        <h5>\u{1F4B3} \xD6deme Durumu</h5>
        ${i?`
          <div class="pp-payment-alert ${i.status}">
            <span>${i.status==="overdue"?"\u26A0\uFE0F Gecikmi\u015F":"\u23F3 Bekleyen"} \xD6deme</span>
            <strong>\u20BA${i.amount.toLocaleString("tr-TR")}</strong>
            <small>${i.month} \xB7 Son tarih: ${i.dueDate}</small>
          </div>
        `:'<div class="pp-payment-ok">\u2705 T\xFCm \xF6demeler g\xFCncel!</div>'}
        <div class="pp-payment-history">
          <small>\xD6deme Ge\xE7mi\u015Fi (${n}/${s.length} \xF6dendi)</small>
          <div class="pp-payment-bar"><div class="pp-payment-fill" style="width:${Math.round(n/Math.max(s.length,1)*100)}%"></div></div>
        </div>
        <button class="sp-btn sp-btn-sm sp-btn-success pp-full-width" id="ppMakePayment">\u{1F4B3} \xD6deme Yap</button>
      </div>

      <div class="pp-card">
        <h5>\u{1F4F1} H\u0131zl\u0131 \u0130\u015Flemler</h5>
        <div class="pp-quick-actions">
          <button class="pp-action-btn" id="ppNotifyAbsence"><span>\u{1F3E0}</span>Devams\u0131zl\u0131k Bildir</button>
          <button class="pp-action-btn" id="ppContactDriver"><span>\u{1F4DE}</span>\u015Eof\xF6r\xFC Ara</button>
          <button class="pp-action-btn" id="ppSendMessage"><span>\u{1F4AC}</span>Mesaj G\xF6nder</button>
          <button class="pp-action-btn" id="ppViewSchedule"><span>\u{1F4C5}</span>Sefer Takvimi</button>
          <button class="pp-action-btn" id="ppRateDriver"><span>\u2B50</span>\u015Eof\xF6r De\u011Ferlendir</button>
          <button class="pp-action-btn" id="ppEmergency"><span>\u{1F6A8}</span>Acil Durum</button>
        </div>
      </div>
    </div>

    <div class="pp-card pp-timeline-card">
      <h5>\u{1F4DC} Son Bildirimler</h5>
      <div class="pp-timeline">
        <div class="pp-tl-item"><div class="pp-tl-dot green"></div><div class="pp-tl-content"><strong>Okula g\xFCvenle ula\u015Ft\u0131</strong><small>Bug\xFCn 08:15</small></div></div>
        <div class="pp-tl-item"><div class="pp-tl-dot blue"></div><div class="pp-tl-content"><strong>Servis dura\u011F\u0131ndan al\u0131nd\u0131</strong><small>Bug\xFCn 07:42</small></div></div>
        <div class="pp-tl-item"><div class="pp-tl-dot blue"></div><div class="pp-tl-content"><strong>Servis yola \xE7\u0131kt\u0131</strong><small>Bug\xFCn 07:15</small></div></div>
        <div class="pp-tl-item"><div class="pp-tl-dot orange"></div><div class="pp-tl-content"><strong>D\xFCn ak\u015Fam seferi 3 dk gecikmeli</strong><small>D\xFCn 16:33</small></div></div>
        <div class="pp-tl-item"><div class="pp-tl-dot green"></div><div class="pp-tl-content"><strong>Mart ay\u0131 \xF6deme hat\u0131rlatmas\u0131</strong><small>2 g\xFCn \xF6nce</small></div></div>
      </div>
    </div>`,e.querySelector("#ppBack")?.addEventListener("click",()=>{re=null,he()}),e.querySelector("#ppTrackBus")?.addEventListener("click",()=>l("Canl\u0131 takip haritas\u0131 a\xE7\u0131l\u0131yor...","info")),e.querySelector("#ppMakePayment")?.addEventListener("click",()=>l("\xD6deme sayfas\u0131na y\xF6nlendiriliyorsunuz...","info")),e.querySelector("#ppNotifyAbsence")?.addEventListener("click",()=>l("Devams\u0131zl\u0131k bildirimi g\xF6nderildi.","success")),e.querySelector("#ppContactDriver")?.addEventListener("click",()=>l(`${a?.driverName} \u015Fof\xF6r aran\u0131yor...`,"info")),e.querySelector("#ppSendMessage")?.addEventListener("click",()=>l("Mesaj penceresi a\xE7\u0131l\u0131yor...","info")),e.querySelector("#ppViewSchedule")?.addEventListener("click",()=>l("Sefer takvimi g\xF6r\xFCnt\xFCleniyor...","info")),e.querySelector("#ppRateDriver")?.addEventListener("click",()=>l("De\u011Ferlendirme formu a\xE7\u0131l\u0131yor...","info")),e.querySelector("#ppEmergency")?.addEventListener("click",()=>l("Acil durum hatt\u0131: (555) 911-0000","warning"))}function st(){he()}var Y=[],M=null,le="";function oe(){let e=c("#messagingContent");if(!e)return;let t=Y.reduce((a,s)=>a+s.unreadCount,0);e.innerHTML=`
    <div class="msg-layout">
      <div class="msg-sidebar">
        <div class="msg-sidebar-header">
          <h5>\u{1F4AC} Mesajlar ${t>0?`<span class="msg-badge">${t}</span>`:""}</h5>
          <button class="sp-btn sp-btn-sm sp-btn-primary" id="msgNewChat">+</button>
        </div>
        <div class="msg-channel-list">
          ${Y.map(a=>`
            <div class="msg-channel ${a.id===M?"active":""} ${a.unreadCount>0?"unread":""}" data-id="${a.id}">
              <div class="msg-ch-avatar ${a.type}">${a.avatar}</div>
              <div class="msg-ch-info">
                <div class="msg-ch-name">${a.name}${a.unreadCount>0?`<span class="msg-unread-dot">${a.unreadCount}</span>`:""}</div>
                <div class="msg-ch-preview">${a.lastMessage.substring(0,40)}${a.lastMessage.length>40?"...":""}</div>
              </div>
              <div class="msg-ch-time">${E(a.lastMessageTime)}</div>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="msg-main">
        ${M?Wt():nt()}
      </div>
    </div>`,Xt(e)}function nt(){return`
    <div class="msg-empty">
      <div class="msg-empty-icon">\u{1F4AC}</div>
      <h4>Mesajla\u015Fma Merkezi</h4>
      <p>\u015Eof\xF6rler, veliler ve ekip \xFCyeleriyle h\u0131zl\u0131ca ileti\u015Fim kurun.</p>
      <small>Sol panelden bir sohbet se\xE7in veya yeni sohbet ba\u015Flat\u0131n.</small>
    </div>`}function Wt(){let e=Y.find(s=>s.id===M);if(!e)return nt();let t=Be(M),a={direct:"\u{1F512} \xD6zel",group:"\u{1F465} Grup",announcement:"\u{1F4E2} Duyuru"}[e.type];return`
    <div class="msg-chat-header">
      <button class="sp-btn sp-btn-sm sp-btn-outline msg-back-btn" id="msgBackBtn">\u2190</button>
      <div class="msg-chat-info">
        <strong>${e.name}</strong>
        <small>${a} \xB7 ${e.participants.length} kat\u0131l\u0131mc\u0131</small>
      </div>
      <div class="msg-chat-actions">
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="msgSearch" title="Ara">\u{1F50D}</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="msgInfo" title="Bilgi">\u2139\uFE0F</button>
      </div>
    </div>
    <div class="msg-messages" id="msgMessages">
      ${t.map(s=>`
        <div class="msg-bubble ${s.senderRole==="admin"?"outgoing":"incoming"}">
          ${s.senderRole!=="admin"?`<div class="msg-bubble-avatar">${s.senderAvatar}</div>`:""}
          <div class="msg-bubble-content">
            ${s.senderRole!=="admin"?`<div class="msg-sender">${s.sender}</div>`:""}
            <div class="msg-text">${s.text}</div>
            <div class="msg-time">${E(s.timestamp)} ${s.read?"\u2713\u2713":"\u2713"}</div>
          </div>
        </div>
      `).join("")}
    </div>
    <div class="msg-input-area">
      <button class="msg-attach-btn" id="msgAttach" title="Dosya Ekle">\u{1F4CE}</button>
      <input type="text" class="msg-input" id="msgInput" placeholder="Mesaj\u0131n\u0131z\u0131 yaz\u0131n..." value="${le}" autocomplete="off">
      <button class="msg-send-btn" id="msgSend" title="G\xF6nder">\u27A4</button>
    </div>`}function Xt(e){e.querySelectorAll(".msg-channel").forEach(n=>{n.addEventListener("click",()=>{M=n.dataset.id;let i=Y.find(o=>o.id===M);i&&(i.unreadCount=0),le="",oe();let r=document.getElementById("msgMessages");r&&(r.scrollTop=r.scrollHeight)})}),e.querySelector("#msgNewChat")?.addEventListener("click",()=>l("Yeni sohbet olu\u015Fturma ekran\u0131 a\xE7\u0131l\u0131yor...","info")),e.querySelector("#msgBackBtn")?.addEventListener("click",()=>{M=null,oe()}),e.querySelector("#msgSearch")?.addEventListener("click",()=>l("Mesaj arama...","info")),e.querySelector("#msgInfo")?.addEventListener("click",()=>l("Sohbet bilgileri g\xF6r\xFCnt\xFCleniyor...","info")),e.querySelector("#msgAttach")?.addEventListener("click",()=>l("Dosya ekleme \xF6zelli\u011Fi yak\u0131nda!","info"));let t=e.querySelector("#msgInput"),a=e.querySelector("#msgSend"),s=()=>{let n=t?.value.trim();if(!n)return;let i=Y.find(o=>o.id===M);i&&(i.lastMessage=n,i.lastMessageTime=new Date),le="",l("Mesaj g\xF6nderildi.","success"),oe();let r=document.getElementById("msgMessages");r&&(r.scrollTop=r.scrollHeight)};a?.addEventListener("click",s),t?.addEventListener("keypress",n=>{n.key==="Enter"&&s()}),t?.addEventListener("input",()=>{le=t.value})}function it(){Y=ze(),oe()}var $=[],F="all",de="all";function ea(e){return{scheduled:"Planland\u0131",in_progress:"Devam Ediyor",completed:"Tamamland\u0131",cancelled:"\u0130ptal"}[e]}function rt(e){return{scheduled:"#2196f3",in_progress:"#ff9800",completed:"#4caf50",cancelled:"#757575"}[e]}function lt(e){return{low:"#4caf50",medium:"#2196f3",high:"#ff9800",urgent:"#e53935"}[e]}function ta(e){return{low:"D\xFC\u015F\xFCk",medium:"Orta",high:"Y\xFCksek",urgent:"Acil"}[e]}function aa(e){return{periodic:"\u{1F527}",repair:"\u{1F6E0}\uFE0F",tire:"\u{1F6DE}",brake:"\u{1F6D1}",oil:"\u{1F6E2}\uFE0F",inspection:"\u{1F4CB}",cleaning:"\u{1F9F9}"}[e]}function be(e){return e.toLocaleString("tr-TR")}function sa(){return $.filter(e=>{let t=F==="all"||e.status===F,a=de==="all"||e.vehiclePlate===de;return t&&a})}function Q(){let e=c("#maintenanceContent");if(!e)return;let t=sa(),a=$.filter(o=>o.status==="completed").reduce((o,p)=>o+p.cost,0),s=$.filter(o=>o.status==="scheduled").length,n=$.filter(o=>o.status==="in_progress").length,i=$.filter(o=>o.priority==="urgent"&&o.status!=="completed").length,r=[...new Set($.map(o=>o.vehiclePlate))];e.innerHTML=`
    <div class="mt-summary">
      <div class="mt-sum-card"><div class="mt-sum-icon">\u{1F527}</div><div class="mt-sum-val">${$.length}</div><div class="mt-sum-lbl">Toplam Kay\u0131t</div></div>
      <div class="mt-sum-card blue"><div class="mt-sum-icon">\u{1F4C5}</div><div class="mt-sum-val">${s}</div><div class="mt-sum-lbl">Planlanm\u0131\u015F</div></div>
      <div class="mt-sum-card orange"><div class="mt-sum-icon">\u2699\uFE0F</div><div class="mt-sum-val">${n}</div><div class="mt-sum-lbl">Devam Eden</div></div>
      <div class="mt-sum-card red"><div class="mt-sum-icon">\u{1F6A8}</div><div class="mt-sum-val">${i}</div><div class="mt-sum-lbl">Acil</div></div>
      <div class="mt-sum-card green"><div class="mt-sum-icon">\u{1F4B0}</div><div class="mt-sum-val">\u20BA${be(a)}</div><div class="mt-sum-lbl">Toplam Maliyet</div></div>
    </div>

    <div class="mt-toolbar">
      <div class="mt-filters">
        <select class="sp-select sp-select-sm" id="mtStatusFilter">
          <option value="all">T\xFCm Durumlar</option>
          <option value="scheduled" ${F==="scheduled"?"selected":""}>Planlanm\u0131\u015F</option>
          <option value="in_progress" ${F==="in_progress"?"selected":""}>Devam Eden</option>
          <option value="completed" ${F==="completed"?"selected":""}>Tamamlanm\u0131\u015F</option>
        </select>
        <select class="sp-select sp-select-sm" id="mtVehicleFilter">
          <option value="all">T\xFCm Ara\xE7lar</option>
          ${r.map(o=>`<option value="${o}" ${de===o?"selected":""}>${o}</option>`).join("")}
        </select>
      </div>
      <button class="sp-btn sp-btn-sm sp-btn-primary" id="mtNewRecord">+ Bak\u0131m Kayd\u0131 Ekle</button>
    </div>

    <div class="mt-cards">
      ${t.map(o=>`
        <div class="mt-card status-${o.status}">
          <div class="mt-card-header">
            <div class="mt-card-type">${aa(o.type)} ${Re[o.type]??o.type}</div>
            <span class="rp-rate-badge" style="background:${rt(o.status)}20;color:${rt(o.status)}">${ea(o.status)}</span>
          </div>
          <div class="mt-card-plate">${o.vehiclePlate}</div>
          <p class="mt-card-desc">${o.description}</p>
          <div class="mt-card-details">
            <div><span>Tarih:</span><strong>${o.scheduledDate}</strong></div>
            <div><span>Maliyet:</span><strong>\u20BA${be(o.cost)}</strong></div>
            <div><span>Firma:</span><strong>${o.vendor}</strong></div>
            <div><span>KM:</span><strong>${be(o.odometer)}</strong></div>
            <div><span>\xD6ncelik:</span><span class="rp-rate-badge" style="background:${lt(o.priority)}20;color:${lt(o.priority)}">${ta(o.priority)}</span></div>
            ${o.nextDue?`<div><span>Sonraki:</span><strong>${o.nextDue}</strong></div>`:""}
          </div>
          <div class="mt-card-actions">
            ${o.status==="scheduled"?`<button class="sp-btn sp-btn-sm sp-btn-primary mt-start-btn" data-id="${o.id}">\u25B6 Ba\u015Flat</button>`:""}
            ${o.status==="in_progress"?`<button class="sp-btn sp-btn-sm sp-btn-success mt-complete-btn" data-id="${o.id}">\u2713 Tamamla</button>`:""}
            <button class="sp-btn sp-btn-sm sp-btn-outline mt-detail-btn" data-id="${o.id}">Detay</button>
          </div>
        </div>
      `).join("")}
    </div>`,na(e)}function na(e){e.querySelector("#mtStatusFilter")?.addEventListener("change",t=>{F=t.target.value,Q()}),e.querySelector("#mtVehicleFilter")?.addEventListener("change",t=>{de=t.target.value,Q()}),e.querySelector("#mtNewRecord")?.addEventListener("click",()=>l("Yeni bak\u0131m kayd\u0131 formu a\xE7\u0131l\u0131yor...","info")),e.querySelectorAll(".mt-start-btn").forEach(t=>{t.addEventListener("click",()=>{let a=$.find(s=>s.id===t.dataset.id);a&&(a.status="in_progress",l(`${a.vehiclePlate} bak\u0131m i\u015Flemi ba\u015Flat\u0131ld\u0131.`,"info"),Q())})}),e.querySelectorAll(".mt-complete-btn").forEach(t=>{t.addEventListener("click",()=>{let a=$.find(s=>s.id===t.dataset.id);a&&(a.status="completed",a.completedDate=new Date().toISOString().split("T")[0],l(`${a.vehiclePlate} bak\u0131m\u0131 tamamland\u0131.`,"success"),Q())})}),e.querySelectorAll(".mt-detail-btn").forEach(t=>{t.addEventListener("click",()=>l("Detay sayfas\u0131 a\xE7\u0131l\u0131yor...","info"))})}function ot(){$=xe(),Q()}var z=[],ce="all",pe="all",ee="all",W="",te=null,X="grid";function ia(){return[...new Set(z.map(e=>e.className))].sort()}function ra(){return z.filter(e=>{let t=ce==="all"||e.className===ce,a=pe==="all"||e.routeId===pe,s=ee==="all"||(ee==="active"?e.isActive:!e.isActive),n=!W||e.name.toLowerCase().includes(W.toLowerCase())||e.parentName.toLowerCase().includes(W.toLowerCase());return t&&a&&s&&n})}function f(){let e=c("#studentMgmtContent");if(!e)return;if(te){da(e);return}let t=ra(),a=ia(),s=z.filter(n=>n.isActive).length;e.innerHTML=`
    <div class="sm-summary">
      <div class="sm-sum-card"><span class="sm-sum-num">${z.length}</span><span>Toplam</span></div>
      <div class="sm-sum-card green"><span class="sm-sum-num">${s}</span><span>Aktif</span></div>
      <div class="sm-sum-card red"><span class="sm-sum-num">${z.length-s}</span><span>Pasif</span></div>
      <div class="sm-sum-card blue"><span class="sm-sum-num">${a.length}</span><span>S\u0131n\u0131f</span></div>
    </div>

    <div class="sm-toolbar">
      <div class="sm-filters">
        <select class="sp-select sp-select-sm" id="smClassFilter"><option value="all">T\xFCm S\u0131n\u0131flar</option>${a.map(n=>`<option value="${n}" ${ce===n?"selected":""}>${n}</option>`).join("")}</select>
        <select class="sp-select sp-select-sm" id="smRouteFilter"><option value="all">T\xFCm G\xFCzergahlar</option>${m.map(n=>`<option value="${n.id}" ${pe===n.id?"selected":""}>${n.name}</option>`).join("")}</select>
        <select class="sp-select sp-select-sm" id="smActiveFilter"><option value="all">T\xFCm\xFC</option><option value="active" ${ee==="active"?"selected":""}>Aktif</option><option value="passive" ${ee==="passive"?"selected":""}>Pasif</option></select>
        <input type="text" class="sp-input sp-input-sm" id="smSearch" placeholder="\xD6\u011Frenci veya veli ara..." value="${W}">
      </div>
      <div class="sm-actions">
        <button class="sp-btn sp-btn-sm ${X==="grid"?"sp-btn-primary":"sp-btn-outline"}" id="smViewGrid">\u25A6</button>
        <button class="sp-btn sp-btn-sm ${X==="table"?"sp-btn-primary":"sp-btn-outline"}" id="smViewTable">\u2630</button>
        <button class="sp-btn sp-btn-sm sp-btn-primary" id="smAddStudent">+ \xD6\u011Frenci Ekle</button>
      </div>
    </div>

    ${X==="grid"?la(t):oa(t)}
    <div style="text-align:center;color:var(--gray);font-size:0.85rem;margin-top:1rem;">${t.length} \xF6\u011Frenci listeleniyor</div>`,ca(e)}function la(e){return`<div class="sm-grid">${e.map(t=>`
    <div class="sm-student-card ${t.isActive?"":"passive"}" data-id="${t.id}">
      <div class="sm-card-avatar">${t.photoInitials}</div>
      <strong>${t.name}</strong>
      <small>${t.className} \xB7 ${t.routeName.split(" - ")[0]}</small>
      <div class="sm-card-tags">
        ${t.isActive?"":'<span class="sm-tag red">Pasif</span>'}
        ${t.allergies?'<span class="sm-tag orange">Alerji</span>':""}
        ${t.notes?'<span class="sm-tag blue">Not</span>':""}
      </div>
      <div class="sm-card-parent">\u{1F464} ${t.parentName}</div>
    </div>
  `).join("")}</div>`}function oa(e){return`<div class="pm-table-wrap"><table class="rp-table">
    <thead><tr><th></th><th>\xD6\u011Frenci</th><th>S\u0131n\u0131f</th><th>G\xFCzergah</th><th>Veli</th><th>Telefon</th><th>Kan</th><th>Durum</th><th>\u0130\u015Flem</th></tr></thead>
    <tbody>${e.map(t=>`
      <tr class="${t.isActive?"":"sm-passive-row"}">
        <td><div class="sm-mini-avatar">${t.photoInitials}</div></td>
        <td><strong>${t.name}</strong></td>
        <td>${t.className}</td>
        <td>${t.routeName.split(" ").slice(0,2).join(" ")}</td>
        <td>${t.parentName}</td>
        <td>${t.parentPhone}</td>
        <td><span class="sm-blood">${t.bloodType}</span></td>
        <td><span class="rp-rate-badge" style="background:${t.isActive?"#4caf50":"#e53935"}20;color:${t.isActive?"#4caf50":"#e53935"}">${t.isActive?"Aktif":"Pasif"}</span></td>
        <td><button class="sp-btn sp-btn-sm sp-btn-outline sm-view-btn" data-id="${t.id}">G\xF6r\xFCnt\xFCle</button></td>
      </tr>
    `).join("")}</tbody></table></div>`}function da(e){let t=z.find(a=>a.id===te);t&&(e.innerHTML=`
    <div class="sm-profile">
      <div class="sm-profile-header">
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="smProfileBack">\u2190 Listeye D\xF6n</button>
        <div class="sm-profile-actions">
          <button class="sp-btn sp-btn-sm sp-btn-primary" id="smEditStudent">\u270F\uFE0F D\xFCzenle</button>
          <button class="sp-btn sp-btn-sm ${t.isActive?"sp-btn-danger":"sp-btn-success"}" id="smToggleActive">${t.isActive?"\u23F8 Pasife Al":"\u25B6 Aktif Et"}</button>
        </div>
      </div>
      <div class="sm-profile-body">
        <div class="sm-profile-main">
          <div class="sm-profile-avatar-lg">${t.photoInitials}</div>
          <h3>${t.name}</h3>
          <span class="rp-rate-badge" style="background:${t.isActive?"#4caf50":"#e53935"}20;color:${t.isActive?"#4caf50":"#e53935"}">${t.isActive?"Aktif \xD6\u011Frenci":"Pasif \xD6\u011Frenci"}</span>
        </div>
        <div class="sm-profile-grid">
          <div class="sm-profile-section">
            <h5>\u{1F392} \xD6\u011Frenci Bilgileri</h5>
            <div class="sm-detail"><span>S\u0131n\u0131f:</span><strong>${t.className}</strong></div>
            <div class="sm-detail"><span>Kan Grubu:</span><strong>${t.bloodType}</strong></div>
            <div class="sm-detail"><span>Alerji:</span><strong>${t.allergies||"Yok"}</strong></div>
            <div class="sm-detail"><span>Kay\u0131t Tarihi:</span><strong>${t.enrollmentDate}</strong></div>
            ${t.notes?`<div class="sm-detail"><span>Not:</span><strong>${t.notes}</strong></div>`:""}
          </div>
          <div class="sm-profile-section">
            <h5>\u{1F468}\u200D\u{1F469}\u200D\u{1F467} Veli Bilgileri</h5>
            <div class="sm-detail"><span>Veli:</span><strong>${t.parentName}</strong></div>
            <div class="sm-detail"><span>Telefon:</span><strong>${t.parentPhone}</strong></div>
            <div class="sm-detail"><span>E-posta:</span><strong>${t.parentEmail}</strong></div>
            <div class="sm-detail"><span>Acil \u0130leti\u015Fim:</span><strong>${t.emergencyContact}</strong></div>
            <div class="sm-detail"><span>Adres:</span><strong>${t.address}</strong></div>
          </div>
          <div class="sm-profile-section">
            <h5>\u{1F68C} Servis Bilgileri</h5>
            <div class="sm-detail"><span>G\xFCzergah:</span><strong>${t.routeName}</strong></div>
            <div class="sm-detail"><span>Durak:</span><strong>${t.stopName}</strong></div>
          </div>
        </div>
      </div>
    </div>`,e.querySelector("#smProfileBack")?.addEventListener("click",()=>{te=null,f()}),e.querySelector("#smEditStudent")?.addEventListener("click",()=>l("D\xFCzenleme formu a\xE7\u0131l\u0131yor...","info")),e.querySelector("#smToggleActive")?.addEventListener("click",()=>{t&&(t.isActive=!t.isActive,l(`${t.name} ${t.isActive?"aktif":"pasif"} duruma al\u0131nd\u0131.`,t.isActive?"success":"warning"),f())}))}function ca(e){e.querySelector("#smClassFilter")?.addEventListener("change",t=>{ce=t.target.value,f()}),e.querySelector("#smRouteFilter")?.addEventListener("change",t=>{pe=t.target.value,f()}),e.querySelector("#smActiveFilter")?.addEventListener("change",t=>{ee=t.target.value,f()}),e.querySelector("#smSearch")?.addEventListener("input",t=>{W=t.target.value,f()}),e.querySelector("#smViewGrid")?.addEventListener("click",()=>{X="grid",f()}),e.querySelector("#smViewTable")?.addEventListener("click",()=>{X="table",f()}),e.querySelector("#smAddStudent")?.addEventListener("click",()=>l("Yeni \xF6\u011Frenci kay\u0131t formu a\xE7\u0131l\u0131yor...","info")),e.querySelectorAll(".sm-student-card").forEach(t=>{t.addEventListener("click",()=>{te=t.dataset.id,f()})}),e.querySelectorAll(".sm-view-btn").forEach(t=>{t.addEventListener("click",()=>{te=t.dataset.id,f()})})}function dt(){z=He(),f()}function pa(){let e=document.querySelectorAll(".sp-tab-btn"),t=document.querySelectorAll(".sp-tab-panel");e.forEach(a=>{a.addEventListener("click",()=>{let s=a.dataset.tab;if(!s)return;e.forEach(i=>i.classList.remove("active")),t.forEach(i=>i.classList.remove("active")),a.classList.add("active");let n=document.getElementById(`panel-${s}`);n&&n.classList.add("active")})})}function ct(){pa(),Ye(),Ie(),Oe(),Ve(),Ke(),_e(),Ue(),Je(),We(),et(),at(),st(),it(),ot(),dt()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ct):ct();})();

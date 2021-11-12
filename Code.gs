function doGet(e) {
 var profiles = e.parameter.profiles.split(',');
var data = itorss(profiles[0]);


//https://script.google.com/macros/s/AKfycbzYSb-1087LhzyuCzkTf1oG0_HMsNbVSNAQ6gLXxnnurSmOXcE/exec?profiles=sajalaly
//https://script.google.com/macros/s/AKfycbxSBuh1d0M7J6MV8o3mgwkil88m1f_5BafrBMSpuJv6zKNLOLDy/exec?profiles=sajalaly
//https://script.google.com/macros/s/AKfycbww97d24uTl6_Ezjbl4o7iYM6ZDatZ9yK7_Squf3St9w_QYWzLXFAEdjsv-1J_KfKa-KQ/exec?profiles=sajalaly

//have to make function
 return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.RSS);

}

function itorss(user) 
{
var main = UrlFetchApp.fetch('https://www.picuki.com/profile/'+user+'/',{muteHttpExceptions: true,}).getContentText();
//var main = UrlFetchApp.fetch('https://www.picuki.com/profile/'+user+'/').getContentText();
var desc=[];
var caption=[];
var imglink=[];
var itemlink=[];  
var name=[];
var itemlink1=[];


var idesc1 = '<h2 class="profile-name-bottom">';
var idesc2 = '</h2>';
name=getvalue(main,idesc1,idesc2);//getting name of instagram user

var iimg1 = '<img class="post-image" src="';//           "thumbnailUrl":
var iimg2 = '"';
imglink=getvalue(main,iimg1,iimg2);//getting image link 

//caption mehnat
//for (var i=0;i<imglink.length;i++){
//
//var ititle1 =imglink[i]+'" alt="';
//var ititle2 = '"';
//caption[i]=getvalue(main,ititle1,ititle2);//getting image caption 
//
//}


var ititle1 ='" alt="‪';
var ititle2 = '"';
caption=getvalue(main,ititle1,ititle2);//getting image caption 


var iimg1 = '<a href="https://www.picuki.com/media/';
var iimg2 = '"';
itemlink=getvalue(main,iimg1,iimg2);//getting post url
//https://www.picuki.com/media/2315481646643478660
//https://www.instagram.com/p/Bu_mJ7jlCpR/

//var feed = parseRSS(name,caption,imglink,itemlink); 

var feed = parseRSS(name,caption,imglink,itemlink); 
var check1234=name+caption+imglink+itemlink;
  
return feed;
}



//function parseRSS(name,caption,imglink,itemlink) {
 function parseRSS(name,itemlink,imglink,itemlink1) {
 var id = Utilities.base64Encode('https://grammio.com/en/new/');
  var cache = CacheService.getPublicCache(); 
 var rss;
  
  if (rss != null) {
    return rss;
  }
  
  var item, date, title, link, desc, guid,ch,dh,description; 
  
  //111
  var rss = new Rss();
 
 var channel = rss.newChannel();
 
 channel.title('RSS 2.0 Feed with Google Apps Script')
 .description('RSS 2.0 Feed')
 .link('http://example.com')
 .language('en')
 .atomLink('http://example.com/rss');
   //1111
  var caption_number=0;
  
// for (var i=0;i<itemlink1.length;i++) {
for (var i=0;i<4;i++) {
var id=i;
    try {
      caption_number++;
      title = itemlink1[i].toString();
      title = title.replace(/&/g, 'and');
      title = 'https://www.instagram.com/'+title
      var formattedDate = Utilities.formatDate(new Date(), "GMT", "EEE, d MMM yyyy HH:mm:ss Z");
      link  = imglink[i].toString();
      link = link.replace(/&amp;/g, '&');
      link = link.replace(/(\r\n|\n|\r)/gm, "");
      var res = name.toString();
      ch=res.replace(/ /gm,'');   
      desc  = itemlink[caption_number].toString();//descriptin 
      desc = desc.replace(/(\r\n|\n|\r)/gm, "");//removing next line from description
      desc = desc.replace(/\s\s+/g, ' ');//removing whit spaces
      desc = desc.replace(/&amp;/g, '&');//removing whit spaces
      guid = title+'1122';
     //description='<br/>[caption id="" align="aligncenter" width="1000"]<img src="'+ link+'" alt="'+name+' hot bikni boobs bra picture" width="1080" height="1080" />'+'<strong> #'+ch+' '+ desc+'</strong>[/caption]]]></description>\n';
     description='<img src="https://www.picuki.com'+ link+'" alt="'+name+' Latest Picture" width="1080" height="1080" />'+'<strong> #'+ch+' '+ desc+'</strong>';
    
    //222
    channel.newItem()
       .title(name)
       .description(description)
       .link(title)
       .pubDate(formattedDate)
       .guid(guid);
      //222
    } catch (e) {
      Logger.log(e);
    }
  }
  
 //333
  var rsss=rss.build();
//333  cache.put(id, rss, 1200); // Cache the feed for an hour
  return rsss;
  
}
































function Rss() {
 this.root = XmlService.createElement('rss')
 .setAttribute('version', '2.0')
 .setAttribute('xmlnsatom', "http://www.w3.org/2005/Atom");
}
Rss.prototype.newChannel = function () {
 return new Channel(this.root);
};
Rss.prototype.build = function () {
 var document = XmlService.createDocument(this.root);
 var xml = XmlService.getPrettyFormat().format(document)
 
 var result = xml.replace('xmlnsatom', 'xmlns:atom')
 .replace('<atomlink href=', '<atom:link href=');
 
 return result;
}
function Channel(root) {
 this.root = root;
 
 this.channel = XmlService.createElement('channel');
 
 this.root.addContent(this.channel);
};
Channel.prototype.title = function (title) {
 this.channel.addContent(XmlService.createElement('title').setText(title));
 
 return this;
};
Channel.prototype.link = function (link) {
 this.channel.addContent(XmlService.createElement('link').setText(link));
 
 return this;
};
Channel.prototype.description = function (description) {
 this.channel.addContent(XmlService.createElement('description').setText(description));
 
 return this;
};
Channel.prototype.language = function (language) {
 this.channel.addContent(XmlService.createElement('language').setText(language));
 
 return this;
};
Channel.prototype.atomLink = function (atomLink) {
 var node = XmlService.createElement('atomlink')
 .setAttribute('href', atomLink)
 .setAttribute('rel', 'self')
 .setAttribute('type', 'application/rss+xml');
 
 this.channel.addContent(node);
 
 return this;
};
Channel.prototype.newItem = function (item) {
 return new Item(this.channel);
};
function Item(channel) {
 this.channel = channel;
 
 this.item = XmlService
 .createElement('item');
 
 this.channel.addContent(this.item);
}
Item.prototype.title = function (title) {
 this.item.addContent(XmlService.createElement('title').setText(title));
 
 return this;
};
Item.prototype.link = function (link) {
 this.item.addContent(XmlService.createElement('link').setText(link));
 
 return this;
};
Item.prototype.description = function (description) {
 this.item.addContent(XmlService.createElement('description').setText(description));
 
 return this;
};
Item.prototype.pubDate = function (pubDate) {
 this.item.addContent(XmlService.createElement('pubDate').setText(pubDate));
 
 return this;
};
//Item.prototype.pubDate = function (pubDate, timezone) {
// var tz = timezone || 'GMT';
// this.item.addContent(XmlService.createElement('pubDate').setText(Utilities.formatDate(pubDate, tz, 'EEE, dd MMM yyyy HH:mm:ss Z')));
// 
// return this;
//};
Item.prototype.guid = function (guid) {
 this.item.addContent(XmlService.createElement('guid').setText(guid));
 
 return this;
};








//html to value
function getvalue(response, index1,index2){
  var value=[];
  var cut=[];
  var ab,bc;
var indexes = getAllIndexes(response, index1);

  //var indexes1 = getAllIndexes(response, index2);
  //indexes.length
for(var i=0;i<indexes.length;i++)
{bc=indexes[i];
bc+=index1.length; 
  cut[i] = response.substring(bc, response.length);
//ab=cut[i].indexOf(index2);
//ab-=index2.length;  
  value[i] = cut[i].substring(0,cut[i].indexOf(index2));
}
return value;
}

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}































//function doGet() {
//var user='sajalaly';
////var a=getInstagramStatistics(user);
//options = {
//    'muteHttpExceptions' : true,
//    'method' : 'GET',
//    'contentType': 'application/json',
//    
//  };
//var url = "https://www.instagram.com/u/?__a=1";
// var result = UrlFetchApp.fetch(url.replace("u", user), options);
////, {
////    muteHttpExceptions: true
////  });
//
//
//
//
////return ContentService.createTextOutput(a).setMimeType(ContentService.MimeType.RSS);  
//return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.RSS);  
//}
//
//
//
//function getInstagramStatistics(user) { 
// var url = "https://www.instagram.com/u";
//url=url.replace("u", user);
//// var txt = UrlFetchApp.fetch(feed).getContentText()?__a=1;
// var result = UrlFetchApp.fetch(url, {
//   muteHttpExceptions: true
// });
// 
// if (result.getResponseCode() === 200) {
//   var json = JSON.parse(result.getContentText()).user;
//   var data = {
//     screen_name: json.username,
//     full_name: json.full_name,
//     is_private: json.is_private,
//     is_verified: json.is_verified,
//     profile_image: json.profile_pic_url,
//     website_url: json.external_url,
//     follower_count: json.edge_followed_by.count,
//     friend_count: json.edge_follow.count,    
//     media: json.media.nodes // just added this 
//   }
//   return data;
// } else {
//   Logger.log('User not found');
//   return result.getContentText();
// }
//}




















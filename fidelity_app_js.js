
	  //piechart
	  
	  function drawPieChart() {
        
		var IF_obj={};
   var product=document.getElementById('product3').value; //the entered product
   var date=document.getElementById('date').value; //the entered date
		

		
		for(var key1 in web_crawler.info)
	  {if((product==web_crawler.info[key1].message) && (date==web_crawler.info[key1].date))             //only check this record if its message matches the product and date
	  {
	   var flag=1;
	   
	   for(var key in IF_obj)
        {if(key==web_crawler.info[key1].source)
	      {flag=0;      //key found
		   IF_obj[key]+=(173/(web_crawler.info[key1].no_days));
		  
		  }
		  
		}
		if(flag)   //new entry
		{IF_obj[web_crawler.info[key1].source]=0;
		 IF_obj[web_crawler.info[key1].source]+=173/(web_crawler.info[key1].no_days);
		}
	   }
	  }
  
	
  var IF_array=[['Source', 'Influence Factor score\n(In thousands)']];
	  
	  for(var key in IF_obj)
	  {
	  IF_array.push([key,IF_obj[key]]);
	  }  
	  
  var data = google.visualization.arrayToDataTable(IF_array);
		
        var options = {
          title: 'Influencing factors on '+date,
		  is3D:true
        };

        var chart = new google.visualization.PieChart(document.getElementById('pie_chart_div'));

        chart.draw(data, options);
      }
	  
	  //column chart
	  
	  function drawColumnChart() {
	   
	  var IF_obj={};
	  
	  for(var key1 in web_crawler.info)
	  {if(document.getElementById('name').value==web_crawler.info[key1].message)             //only check this record if its message matches the product
	  {
	   var flag=1;
	   
	   for(var key in IF_obj)
        {if(key==web_crawler.info[key1].source)
	      {flag=0;      //key found
		   IF_obj[key]+=(173/(web_crawler.info[key1].no_days));
		  
		  }
		  
		}
		if(flag)   //new entry
		{IF_obj[web_crawler.info[key1].source]=0;
		 IF_obj[web_crawler.info[key1].source]+=173/(web_crawler.info[key1].no_days);
		}
	   }
	  }
	 
	  var IF_array=[['Source', 'Influence Factor score\n(In thousands)']];
	  
	  for(var key in IF_obj)
	  {
	  IF_array.push([key,IF_obj[key]]);
	  }  
	  
  var data = google.visualization.arrayToDataTable(IF_array);
  

  var options = {
    title: 'Outreach Patterns\n\n Object->facebook->score=(mentions today)+(mentions yesterday)/2+(mentions today-2)/3+…',
    hAxis: {title: 'Source', titleTextStyle: {color: 'red'}}
  };

  var chart = new google.visualization.ColumnChart(document.getElementById('column_chart_div'));

  chart.draw(data, options);

}

   //linechart
   
   function drawLineChart() {
   
   var IF_obj={};
   var Product_obj={};
   var product=document.getElementById('product').value; //the entered product
   
   if(product=="Wilson")
    product="tennis";
  if(product=="F50")
    product="shoes"; 

 
   //this loop is for the first stage of the algorithm
   
   for(var key1 in web_crawler.info)
	  {if(product==web_crawler.info[key1].message)             //only check this record if its message matches the product
	 
	  {
	   var flag=1;
	   
	   for(var key in IF_obj)
        {if(key==web_crawler.info[key1].source)
	      {flag=0;      //key found
		  IF_obj[key]+=(173/(web_crawler.info[key1].no_days));
		  }
		  
		}
		if(flag)   //new entry
		{IF_obj[web_crawler.info[key1].source]=0;
		 IF_obj[web_crawler.info[key1].source]+=173/(web_crawler.info[key1].no_days);
		}
	   }
	  }
	  
	  
	  //this loop is for the second stage of the algorithm   //{date:{facebook:2.5,IF:2.5}}
	  
	   for(var key1 in web_crawler.info)
	  {if(product==web_crawler.info[key1].message)             //only check this record if its message matches the product
	  {
	   var flag=1;
	   
	   for(var key in Product_obj)
        {if(key==web_crawler.info[key1].date)
	      {flag=0;      //key found
		  if(web_crawler.info[key1].mention=="positive")
		    Product_obj[key].score+=(Product_obj[key].IF);
		  else
		    Product_obj[key].score-=(Product_obj[key].IF);
		  }
		  
		}
		if(flag)   //new entry
		{
		 Product_obj[web_crawler.info[key1].date]={IF:IF_obj[web_crawler.info[key1].source],score:IF_obj[web_crawler.info[key1].source]};
		 
		}
	   }
	  }
	  
	  
      var Product_array=[['Date', product]];
	  
	  
	  for(var key in Product_obj)
	  {
	  Product_array.push([key,Product_obj[key].score]);
	  }
        var data = google.visualization.arrayToDataTable(Product_array);

        var options = {
          title: 'Product Performance \n Calculated by the formula = (Closest category)->facebook->score*(NOPM-NONM)+ (Closest category)->twitter->score*(NOPM-NONM)+...'
        };

        var chart = new google.visualization.LineChart(document.getElementById('line_chart_div'));

        chart.draw(data, options);
      }

//draw the 2nd line chart

function drawLineChart2() {
   
   var IF_obj={};
   var Product_obj1={};
   var product1=document.getElementById('product1').value; //the entered product
   
   if(product1=="Wilson")
    product1="tennis";
  if(product1=="F50")
    product1="shoes";
	
   //this loop is for the first stage of the algorithm
   
   for(var key1 in web_crawler.info)
	  {if(product1==web_crawler.info[key1].message)             //only check this record if its message matches the product
	  
	  {
	   var flag=1;
	   
	   for(var key in IF_obj)
        {if(key==web_crawler.info[key1].source)
	      {flag=0;      //key found
		  IF_obj[key]+=(173/(web_crawler.info[key1].no_days));
		  }
		  
		}
		if(flag)   //new entry
		{IF_obj[web_crawler.info[key1].source]=0;
		 IF_obj[web_crawler.info[key1].source]+=173/(web_crawler.info[key1].no_days);
		}
	   }
	  }
	  
	  
	  //this loop is for the second stage of the algorithm   //{date:{facebook:2.5,IF:2.5}}
	  
	   for(var key1 in web_crawler.info)
	  {if(product1==web_crawler.info[key1].message)             //only check this record if its message matches the product
	  {
	   var flag=1;
	   
	   for(var key in Product_obj1)
        {if(key==web_crawler.info[key1].date)
	      {flag=0;      //key found
		  if(web_crawler.info[key1].mention=="positive")
		    Product_obj1[key].score+=(Product_obj1[key].IF);
		  else
		    Product_obj1[key].score-=(Product_obj1[key].IF);
		  }
		  
		}
		if(flag)   //new entry
		{
		 Product_obj1[web_crawler.info[key1].date]={IF:IF_obj[web_crawler.info[key1].source],score:IF_obj[web_crawler.info[key1].source]};
		 
		}
	   }
	  }
	  
	  
	  //this is calculation for the 2nd product
	  
   IF_obj={};
   var Product_obj2={};
   var product2=document.getElementById('product2').value; //the entered product
   
   if(product2=="Wilson")
    product2="tennis";
  if(product2=="F50")
    product2="shoes";
   
   //this loop is for the first stage of the algorithm
   
   for(var key1 in web_crawler.info)
	  {if(product2==web_crawler.info[key1].message)             //only check this record if its message matches the product
	   
	  {
	   var flag=1;
	   
	   for(var key in IF_obj)
        {if(key==web_crawler.info[key1].source)
	      {flag=0;      //key found
		  IF_obj[key]+=(173/(web_crawler.info[key1].no_days));
		  }
		  
		}
		if(flag)   //new entry
		{IF_obj[web_crawler.info[key1].source]=0;
		 IF_obj[web_crawler.info[key1].source]+=173/(web_crawler.info[key1].no_days);
		}
	   }
	  }
	  
	  
	  //this loop is for the second stage of the algorithm   //{date:{facebook:2.5,IF:2.5}}
	  
	   for(var key1 in web_crawler.info)
	  {if(product2==web_crawler.info[key1].message)             //only check this record if its message matches the product
	  {
	   var flag=1;
	   
	   for(var key in Product_obj2)
        {if(key==web_crawler.info[key1].date)
	      {flag=0;      //key found
		  if(web_crawler.info[key1].mention=="positive")
		    Product_obj2[key].score+=(Product_obj2[key].IF);
		  else
		    Product_obj2[key].score-=(Product_obj2[key].IF);
		  }
		  
		}
		if(flag)   //new entry
		{
		 Product_obj2[web_crawler.info[key1].date]={IF:IF_obj[web_crawler.info[key1].source],score:IF_obj[web_crawler.info[key1].source]};
		 
		}
	   }
	  }
	  
      var Product_array=[['Date', product1,product2]];
	  
	  
	  for(var key in Product_obj1)
	  {
	 
	  Product_array.push([key,Product_obj1[key].score,Product_obj2[key].score]);
	  }
   
      
        var data = google.visualization.arrayToDataTable(Product_array);

        var options = {
          title: 'Product Performance \n Calculated by the formula = (Closest category)->facebook->score*(NOPM-NONM)+ (Closest category)->twitter->score*(NOPM-NONM)+...'
        };

        var chart = new google.visualization.LineChart(document.getElementById('line_chart_div2'));

        chart.draw(data, options);
      }


function changeclass(no)
	  {if(no==1)
	    {document.getElementById('U1').className="active";
		 document.getElementById('U1_div').className="tab-pane active";
		 //use case 2
		 document.getElementById('U2').className="";
		 document.getElementById('U2_div').className="tab-pane";
		 //use case 3
		 document.getElementById('U3').className="";
		 document.getElementById('U3_div').className="tab-pane";
		 //use case 4
		 document.getElementById('U4').className="";
		 document.getElementById('U4_div').className="tab-pane";
		}
	  else if (no==2)
	  {document.getElementById('U1').className="";
		 document.getElementById('U1_div').className="tab-pane ";
	     document.getElementById('U2').className="active";
		 document.getElementById('U2_div').className="tab-pane active";
		 //use case 3
		 document.getElementById('U3').className="";
		 document.getElementById('U3_div').className="tab-pane";
		 //use case 4
		 document.getElementById('U4').className="";
		 document.getElementById('U4_div').className="tab-pane";
		}
		else if(no==3)
		{document.getElementById('U1').className="";
		 document.getElementById('U1_div').className="tab-pane";
		 //use case 2
		 document.getElementById('U2').className="";
		 document.getElementById('U2_div').className="tab-pane";
		 //use case 3
		 document.getElementById('U3').className="active";
		 document.getElementById('U3_div').className="tab-pane active";
		 //use case 4
		 document.getElementById('U4').className="";
		 document.getElementById('U4_div').className="tab-pane";
		}
		else
		{document.getElementById('U1').className="";
		 document.getElementById('U1_div').className="tab-pane";
		 //use case 2
		 document.getElementById('U2').className="";
		 document.getElementById('U2_div').className="tab-pane";
		 //use case 3
		 document.getElementById('U3').className="";
		 document.getElementById('U3_div').className="tab-pane";
		 //use case 4
		 document.getElementById('U4').className="active";
		 document.getElementById('U4_div').className="tab-pane active";
		}
	  }
	  
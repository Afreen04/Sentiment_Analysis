/*
var data=
{
  {source:"facebook",
   message:"I love these shoes"
  }
};*/

var fidapp=angular.module('Fidelity_app',[]);


fidapp.filter('findsin', function () {
    return function (input) {
        return Math.sin(input * Math.PI / 180);
    }
});

fidapp.filter('findcos', function () {
    return function (input) {
        return Math.cos(input * Math.PI / 180);
    }
});

fidapp.filter('findtan', function () {
    return function (input) {
        return Math.tan(input * Math.PI / 180);
    }
});

fidapp.filter('findlog', function () {
    return function (input) {
        return Math.log(input);
    }
});

fidapp.filter('findsqrt', function () {
    return function (input) {
        return Math.sqrt(input);
    }
});
/*
fidapp.filter('dumty', function () {

	return function(input)
{console.log("hi");
 return input;
};
});*/

fidapp.service('math', function () {

this.multiply = function (x, y,data_extracted) {
var i=1;
for(var key in data_extracted)
{console.log(i++);
}
return x * y;
};

this.influence_factor = function () {
for(var key in $scope.web_crawler.info)
{console.log(this);
}

};

});



fidapp.controller('FidCtrl',['$scope','math',function($scope, math){
$scope.text='Answer goes here!';

$scope.sin=90;
$scope.cos=90;
$scope.tan=90;
$scope.log=0;
$scope.sqrt=0;

$scope.dumty=function(input)
{//console.log("hi");
 var i=1;
 for(var key in input)
{if($scope.name==input.source)
  console.log("hi");
}
     google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
	  alert("ya im coming");
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
 return input;
};

$scope.product = function() {
    var result = math.multiply($scope.cos , $scope.sin,$scope.web_crawler.info);
    return result;
  };
  
$scope.web_crawler={};

$scope.web_crawler.info=[

  {source:"facebook",
   message:"I love these shoes"
  },
  {source:"facebook",
   message:"I love these shoes"
  }
];
}]);

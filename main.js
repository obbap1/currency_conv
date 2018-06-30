const app = angular.module("myApp",[]);

app.controller('myCtrl',($scope,$http)=>{

    $scope.submit = ()=>{

        let query = $scope.prevCurr + '_' + $scope.newCurr ;

        $http({
            method : "GET",
            url : "https://free.currencyconverterapi.com/api/v5/convert?q=" + query + "&compact=ultra"
        }).then(response=>{
            console.log(response);
            try{
                let JSONobj = response.data;
                let val = JSONobj[query];
    
                if(val){
                    let total = val * $scope.currentValue;
                    $scope.answer = Math.round(total * 100 / 100);
                }
            } catch(e) {
                console.log('error',e);
            }

        }).catch(error=>{
            console.log('error',error);
        });
    }

    $scope.getCurrencies = ()=>{
        
        $http({
            method : "GET",
            url : "https://free.currencyconverterapi.com/api/v5/currencies"
        }).then(response=>{
            
            $scope.currencies = response.data.results;
            console.log('currencies',$scope.currencies);
        }).catch(error=>{
            console.log('error',error);
        });
    }

    
})
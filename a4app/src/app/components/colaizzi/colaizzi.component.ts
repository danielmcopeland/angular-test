import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import 'chartjs-color';
import 'jquery';



@Component({
  selector: 'app-colaizzi',
  templateUrl: './colaizzi.component.html',
  styleUrls: ['./colaizzi.component.css']
})
export class ColaizziComponent implements OnInit {
  modifiedResponses = [0, 0, 0, 0, 0, 0];
  modifiedResponsesPercentage = [0, 0, 0, 0, 0, 0];
  originalColazzisResponses = [0, 0, 0, 0, 0, 0];
  originalColazzisResponsesPercentage = [0, 0, 0, 0, 0, 0];
  salaryRanges = [];

  constructor() { 
    console.log('Colaizzi Constructor running...');
  }

  ngOnInit() {
    console.log('Colaizzi running...');
  }
 
  addNewSalaryRange = function(lowSalary, highSalary) {
    this.addModifiedResponse(lowSalary, highSalary);
    this.addOriginalColazzisResponse(lowSalary, highSalary);
  };
  // passes input ranges to both arrays

  addModifiedResponse = function(lowSalary, highSalary) {
    if (lowSalary > highSalary) {
      //System.out.println("Error: lowSalary should be less than or equal to highSalary");
    }
    // Checks if the input ranges are ordered correctly

    for (let i = 0, rangeLowerBound = 30000; i < this.modifiedResponses.length; i++, rangeLowerBound += 10000) {
      // checks the input for each salary range
      if (lowSalary >= rangeLowerBound) {

        if (highSalary <= rangeLowerBound + 10000) {
          // checks if the input range is within
          // a single salary range of the array

          if (lowSalary - rangeLowerBound == (rangeLowerBound + 10000) - highSalary) {
            // add 100% (1.0) to a salary range if the input is
            // distributed directly in the middle of the range
            // i.e. 44000-46000, 45000-45000, 50000-60000
            this.modifiedResponses[i] += 1.0;
          }
          

          else {
            // if the input range is skewed towards one end of a salary range,
            // expands the input range to cover multiple salary ranges and runs the loop
            // recursively
            // i.e. 40000-45000 becomes 37500-47500
            // this provides for more accurate data when put on a graph
            let lowEnd = (+lowSalary + +highSalary) / 2 - 5000;
            let highEnd = (+lowSalary + +highSalary) / 2 + 5000;
            this.addModifiedResponse(lowEnd, highEnd);
            break;
          }
          
        }

        else if (lowSalary < rangeLowerBound + 10000) {
          // if lowest part of an input range falls within a salary range,
          // calculates the percentage of the input range to add to the salary range
          let total = highSalary - lowSalary;
          let lowdif = rangeLowerBound + 10000 - lowSalary;
          let perc = (lowdif) / total;
          this.modifiedResponses[i] += perc;
        }
        
      }

      else if (highSalary >= rangeLowerBound + 10000) {
        // if the input range contains a salary range completely,
        // calculates the percentage of the input range to add to the salary range
        let total = highSalary - lowSalary;
        let perc = (10000) / total;
        this.modifiedResponses[i] += perc;
      }
      

      else if (highSalary > rangeLowerBound && highSalary <= rangeLowerBound + 10000) {
        // if highest part of an input range falls within a salary range,
        // calculates the percentage of the input range to add to the salary range
        let total = highSalary - lowSalary;
        let highdif = highSalary - rangeLowerBound;
        let perc = (highdif) / total;
        this.modifiedResponses[i] += perc;
      }
      
    }
  };

  addOriginalColazzisResponse = function(lowSalary, highSalary) {
    if (lowSalary > highSalary) {
      //System.out.println("Error: Start should be less than or equal to rangeEnd");
    }
    for (let i = 0, j = 30000; i < this.originalColazzisResponses.length; i++, j += 10000) {
      if (lowSalary >= j) {
        if (lowSalary < j + 10000) {
          this.originalColazzisResponses[i]++;
        }
      } else if (highSalary > j) {
        this.originalColazzisResponses[i]++;
      }
    }
  };

  calculateModifiedPercentages = function() {
    let total = this.modifiedResponsesSum();
    for (let i = 0; i < this.modifiedResponses.length; i++) {
      if (this.modifiedResponses[i] == 0) {
        this.modifiedResponsesPercentage[i] = 0;
      }
      else {
        this.modifiedResponsesPercentage[i] = this.modifiedResponses[i] * 100 / total;
      }
    }
  };

  calculateOriginalColazzisPercentages = function() {
    let total = this.originalColazzisSum();
    for (let i = 0; i < this.originalColazzisResponses.length; i++) {
      if (this.originalColazzisResponses[i] == 0) {
        this.originalColazzisResponsesPercentage[i] = 0;
      }
      else {
        this.originalColazzisResponsesPercentage[i] = this.originalColazzisResponses[i] * 100 / total;
      }
    }
  };
  // populates bad badpercentages array

  originalColazzisSum = function() {
    let total = 0;
    this.originalColazzisResponses.forEach(function(i, s:any) {
      total += s;
    });
    return total;
  };
  // calculates the total data points of Colazzi's Method

  modifiedResponsesSum = function() {
    let total = 0;
    this.modifiedResponses.forEach(function(i, s:any) {
      total += s;
    });
    return total;
  };
  // calculates the total number of inputs (through my method)

  clearArrays = function() {
    for (let i = 0; i < this.modifiedResponses.length; i++) {
      this.modifiedResponses[i] = 0;
    }

    for (let i = 0; i < this.originalColazzisResponses.length; i++) {
      this.originalColazzisResponses[i] = 0;
    }

    for (let i = 0; i < this.modifiedResponsesPercentage.length; i++) {
      this.modifiedResponsesPercentage[i] = 0;
    }

    for (let i = 0; i < this.originalColazzisResponsesPercentage.length; i++) {
      this.originalColazzisResponsesPercentage[i] = 0;
    }
  };
  // Clears the arrays

  round = function(num) {
    num *= 100;
    num = Math.round(num);
    num /= 100;
    return num;
  }
  
  sampleAdminRanges = function() {
    this.deleteAllRanges();
    this.addRange(60000, 60000);
    this.addRange(40000, 50000);
    this.addRange(46000, 55000);
    this.addRange(43680, 43680);
    this.addRange(43535, 69635);
    this.addRange(36000, 48000);
    this.addRange(50000, 50000);
    this.addRange(38000, 57000);
    this.addRange(50000, 60000);
    this.addRange(45000, 50000);
    this.addRange(40000, 45000);
    this.addRange(32000, 38000);
    this.addRange(45000, 50000);
    this.addRange(40000, 45000);
  };

  sampleStudentRanges = function() {
    this.deleteAllRanges();
    this.addRange(80000, 85000);
    this.addRange(45000, 50000);
    this.addRange(40000, 40000);
    this.addRange(45000, 55000);
    this.addRange(35000, 35000);
    this.addRange(60000, 80000);
    this.addRange(45000, 45000);
    this.addRange(30000, 50000);
    this.addRange(50000, 75000);
    this.addRange(70000, 70000);
    this.addRange(60000, 70000);
    this.addRange(40000, 45000);
    this.addRange(40000, 50000);
    this.addRange(50000, 60000);
    this.addRange(50000, 60000);
    this.addRange(70000, 85000);
    this.addRange(45000, 55000);
    this.addRange(50000, 60000);
  };

  sampleCrazyData = function() {
    this.deleteAllRanges();
    this.addRange(35000, 60000);
    this.addRange(60000, 85000);
    this.addRange(39000, 89000);
    this.addRange(39000, 51000);
    this.addRange(60000, 90000);
    this.addRange(60000, 60000);
    this.addRange(50000, 50000);
    this.addRange(40000, 40000);
    this.addRange(30000, 30000);
    this.addRange(70000, 70000);
    this.addRange(80000, 80000);
  }
  
  submitRange = function() {
    let low = $('#inputLow').val();
    let high = $('#inputHigh').val();
    if(low != '' && high != '') {
      this.addRange(low, high);
    }
  };
  
  addRange = function(low, high) {
    //addNewSalaryRange(low, high);
    if(low <= high) {
      this.salaryRanges.push([low, high]);
      this.recalculateRanges();
    }
  };
  
  deleteRange = function(i) {
    this.salaryRanges.splice(i, 1);
    this.recalculateRanges();
  };
  
  recalculateRanges = function() {
    this.clearArrays();
    this.salaryRanges.forEach(function(i, data) {
      this.addNewSalaryRange(data[0], data[1]);
    });
    this.calculateModifiedPercentages();
    this.calculateOriginalColazzisPercentages();
    this.refreshRangeTable();
    this.refreshDataTable();
    this.updateCharts();
  };
  
  deleteAllRanges = function() {
    this.salaryRanges = [];
    this.recalculateRanges();
  };
  
  refreshRangeTable = function() {
    $('#rangeTable tr.bold').siblings().remove();
    let rangeTableRows = '';
    $(this.salaryRanges).each(function(i, data) {
      rangeTableRows += "<tr><td>" + data[0] + "</td><td>" + data[1] + "</td><td><button onClick=\"deleteRange("+i+")\" class=\"btn btn-danger deleteButton\">Clear Entry</button></td></tr>";
    });
    $('#rangeTable').append(rangeTableRows);
  };
  
  refreshDataTable = function() {
    $('#dataTable tr.bold').siblings().remove();
    let dataTableRows = '';
    for (let i = 0, j = 30000; i < this.modifiedResponses.length; i++, j += 10000) {
      dataTableRows += "<tr><td>$" + j + " - $" + (j+9999) + "</td><td>" + this.round(this.originalColazzisResponses[i]) + "</td><td>" + this.round(this.originalColazzisResponsesPercentage[i]) + "%</td><td>" + this.round(this.modifiedResponses[i]) + "</td><td>" + this.round(this.modifiedResponsesPercentage[i]) + "%</td></tr>";
      $('#graph1 .col'+i).css('height', Math.round(this.originalColazzisResponsesPercentage[i]));
      $('#graph2 .col'+i).css('height', Math.round(this.modifiedResponsesPercentage[i]));
    }
    $('#dataTable').append(dataTableRows);
  };

  colaizziDataset = {
    label: 'Colaizzi\'s Method',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: this.originalColazzisResponsesPercentage
  };

  modifiedDataset = {
    label: 'Modified Method',
    backgroundColor: 'rgb(54, 162, 235)',
    borderColor: 'rgb(54, 162, 235)',
    data: this.modifiedResponsesPercentage
  };

  chartLabels = ['$30000 - $39999', '$40000 - $49999', '$50000 - $59999', '$60000 - $69999', '$70000 - $79999', '$80000 - $89999'];

  updateCharts = function() {
    this.sideBySideChart.update();
    this.colaizziChart.update();
    this.modifiedChart.update();
  };
  
  sbs = <HTMLCanvasElement> document.getElementById('sideBySideChart');
  modi = <HTMLCanvasElement> document.getElementById('modifiedChart');
  cola = <HTMLCanvasElement> document.getElementById('colaizzisChart');

  

  // sideBySideChart = new Chart(this.sbs, {
  //   type: 'bar',
  //   data: {
  //     labels: this.chartLabels,
  //     datasets: [this.colaizziDataset, this.modifiedDataset]
  //   },
  //   options: {
  //     elements: {
  //       rectangle: {
  //         borderWidth: 2,
  //       }
  //     },
  //     responsive: true,
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: false,
  //       text: 'Chart.js Horizontal Bar Chart'
  //     }
  //   }
  // });

  // modifiedChart = new Chart(this.modi, {
  //   type: 'horizontalBar',
  //   data: {
  //     labels: this.chartLabels,
  //     datasets: [this.modifiedDataset]
  //   },
  //   options: {
  //     elements: {
  //       rectangle: {
  //         borderWidth: 2,
  //       }
  //     },
  //     responsive: true,
  //     legend: {
  //       display: false,
  //       position: 'right',
  //     },
  //     title: {
  //       display: false,
  //       text: 'Chart.js Horizontal Bar Chart'
  //     }
  //   }
  // });

  // colaizziChart = new Chart(this.cola, {
  //   type: 'horizontalBar',
  //   data: {
  //     labels: this.chartLabels,
  //     datasets: [this.colaizziDataset]
  //   },
  //   options: {
  //     elements: {
  //       rectangle: {
  //         borderWidth: 2,
  //       }
  //     },
  //     responsive: true,
  //     legend: {
  //       display: false,
  //       position: 'right',
  //     },
  //     title: {
  //       display: false,
  //       text: 'Chart.js Horizontal Bar Chart'
  //     }
  //   }
  // });  

  
}


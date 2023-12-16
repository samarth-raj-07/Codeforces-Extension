document.addEventListener('DOMContentLoaded', function () {
    function fetchProblems(callback) {
      var url = 'https://codeforces.com/api/problemset.problems';
  
      // Make a request to the Codeforces API to fetch the problems
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.status === 'OK') {
            var problems = data.result.problems;
            callback(problems);
          }
        })
        .catch(function (error) {
          console.error('Error fetching problems:', error);
        });
    }
  
    function filterProblems(problems, minRating, maxRating) {
      // Filter the problems based on the rating range
      var filteredProblems = problems.filter(function (problem) {
        var rating = problem.rating;
        return rating >= minRating && rating <= maxRating;
      });
  
      return filteredProblems;
    }
  
    function displayProblems(problems) {
        var problemContainer = document.getElementById('problemContainer');
        problemContainer.innerHTML = '';
      
        if (problems.length === 0) {
          problemContainer.textContent = 'No problems found within the specified rating range.';
        } else {
          var randomIndex = Math.floor(Math.random() * problems.length);
          var randomProblem = problems[randomIndex];
          var problemUrl = `https://codeforces.com/problemset/problem/${randomProblem.contestId}/${randomProblem.index}`;
      
         
          chrome.tabs.create({ url: problemUrl });
        }
      }
      
      
  
    document.getElementById('filterButton').addEventListener('click', function () {
      var minRating = parseInt(document.getElementById('minRating').value);
      var maxRating = parseInt(document.getElementById('maxRating').value);
  
      if (isNaN(minRating) || isNaN(maxRating) || minRating > maxRating) {
        alert('Invalid rating range.');
        return;
      }
  
      fetchProblems(function (problems) {
        var filteredProblems = filterProblems(problems, minRating, maxRating);
        displayProblems(filteredProblems);
      });
    });
  });
  

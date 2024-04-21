function injectForm() {
    //html forms
    var formHTML = `
      <div id="problemFilterForm" style="display: none;">
        <label for="minRating">Minimum Rating:</label>
        <input type="number" id="minRating" min="1" max="4000" />
        <br />
        <label for="maxRating">Maximum Rating:</label>
        <input type="number" id="maxRating" min="1" max="4000" />
        <br />
        <button id="filterButton">Filter Problems</button>
      </div>
    `;
  
    var formContainer = document.createElement('div');
    formContainer.innerHTML = formHTML;
    document.body.appendChild(formContainer);
  
    var filterButton = document.getElementById('filterButton');
    filterButton.addEventListener('click', function () {
      var minRating = parseInt(document.getElementById('minRating').value);
      var maxRating = parseInt(document.getElementById('maxRating').value);
  
      if (isNaN(minRating) || isNaN(maxRating) || minRating > maxRating) {
        alert('Invalid rating range.');
        return;
      }
  
      fetchAndFilterProblems(minRating, maxRating);
    });
  }
  
  function fetchAndFilterProblems(minRating, maxRating) {
    var url = 'https://codeforces.com/api/problemset.problems';
  
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.status === 'OK') {
          var problems = data.result.problems;
          var filteredProblems = problems.filter(function (problem) {
            var rating = problem.rating;
            return rating >= minRating && rating <= maxRating;
          });
  
          openRandomProblem(filteredProblems);
        }
      })
      .catch(function (error) {
        console.error('Error fetching problems:', error);
      });
  }
  
  function openRandomProblem(problems) {
    if (problems.length === 0) {
      alert('No problems found within the specified rating range.');
      return;
    }
  
    var randomIndex = Math.floor(Math.random() * problems.length);
    var randomProblem = problems[randomIndex];
    var problemUrl = `https://codeforces.com/problemset/problem/${randomProblem.contestId}/${randomProblem.index}`;
    window.open(problemUrl, '_blank');
  }
  
  injectForm();
  

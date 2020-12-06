const deleteButton = document.getElementById('delete-quote');
const newQuoteContainer = document.getElementById('new-quote');

deleteButton.addEventListener('click', () => {
  
  const person = document.getElementById('person').value;

  fetch(`/api/quotes?person=${person}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(({deletedPerson}) => {
    const newQuote = document.createElement('div');
    if(deletedPerson !== person)

    newQuote.innerHTML = `
    <h3>Oops!</h3>
    
    <div class="attribution">- ${deletedPerson}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    else 
    newQuote.innerHTML = `
    <h3>Congrats, your quote was deleted!</h3>
    
    <div class="attribution">- ${deletedPerson}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    newQuoteContainer.appendChild(newQuote);
    
  });
});

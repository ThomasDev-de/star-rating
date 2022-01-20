# jQuery star-rating plugin

### setup
wrapperClasses: 'p-5 shadow',
starIconEmpty: 'fa fa-star-o',
starIconFull: 'fa fa-star',
starColorEmpty: 'lightgray',
starColorFull: '#FFC107',
starsSize: 4, // em
stars: 5,
showInfo: true,
titles: ["Sehr schlecht", "Schlecht", "Mittel", "Gut", "Sehr gut!"],
inputName: 'rating'

### example

```
<div class="rating"></div>

<script>
  $('.rating').starRating(
  {
    starSize: 1.5,
    showInfo: false
  );
</script>
```

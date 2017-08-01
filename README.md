# Materialize sass ruby gem [![Gem Version](https://badge.fury.io/rb/materialize-sass.svg)](http://badge.fury.io/rb/materialize-sass)

`materialize-sass` is a Sass powered version of [Materialize](http://materializecss.com), a modern responsive front-end framework based on Material Design.

example: http://materialize.labs.my/ 

source: https://github.com/mkhairi/materialize-rails

## Dependencies

**Rails 5.1+**
The Rails JavaScript helpers has been rewritten in a new gem called rails-ujs and they use vanilla JavaScript, so jQuery is not a dependency of Rails anymore. Since materializecss relies on it, install it with ```bin/yarn add jquery``` or via ```gem 'jquery-rails'```  and add ```//= require jquery``` to ```application.js```. 

**NOTE:** Ensure that the `sass-rails` gem is presented in your Gemfile.


## Installation

In your Gemfile you need to add the `materialize-sass` gem:

```ruby
gem 'materialize-sass'
```


And then run the bundler and restart your server to make the files available through the pipeline:

```console
$ bundle install
```

Or install it separately:

```console
$ gem install materialize-sass
```

## Usage

### a. Sass

Import Materialize styles in `app/assets/stylesheets/application.scss`:

```scss
@import "materialize";
```

**NOTE:** If you have just generated a new Rails application, it  may come with a `.css` file instead. If this file exists, it will be served instead of Sass, so remove it.

```console
$ rm app/assets/stylesheets/application.css
```

**HINT:** Override materialize color variable.

Since materialize color scheme are declared in color.scss you should import the color.scss first. then you can override color variable just like this:

```scss
@import "materialize/components/color";
$primary-color: color("blue", "lighten-2") !default;
$secondary-color: color("yellow", "base") !default;
@import 'materialize';
```

or

You can import each component just like in this file below:
https://github.com/mkhairi/materialize-sass/blob/master/app/assets/stylesheets/materialize.scss

### b. JavaScript

Require Materialize javascripts in `app/assets/javascripts/application.js`:

For turbolinks 5 users
```js
//= require jquery
//= require turbolinks
//= require materialize-sprockets
```

For turbolinks classic users

Add [`jquery-turbolinks`](https://github.com/kossnocorp/jquery.turbolinks) gem to Gemfile

``` gem 'jquery-turbolinks' ```

```js
//= require jquery
//= require jquery.turbolinks
//= require materialize
//= require turbolinks
```

For non turbolinks users
```js
//= require jquery
//= require materialize
```

### c. Extras

[noUiSlider](http://materializecss.com/forms.html#range)

in your application.scss
```scss
@import "materialize/extras/nouislider";
```
in your application.js
```js
//= require materialize/extras/nouislider
```

### d. Icons

Include this line in the <head>portion of your HTML code

``` <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> ```

or import this line in your application.scss

``` @import "https://fonts.googleapis.com/icon?family=Material+Icons"; ```

or install this gem for offline icons

``` gem 'material_icons' ```

see [docs](https://github.com/Angelmmiguel/material_icons)

## Contributing
note: Any changes or Pull Request regarding materialize assets should be made in official [materialize](https://github.com/Dogfalo/materialize) repo.

1. Fork it ( https://github.com/mkhairi/materialize-sass/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

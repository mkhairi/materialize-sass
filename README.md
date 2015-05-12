# Materialize Sass version for Rails Asset Pipeline
[![Gem Version](https://badge.fury.io/rb/materialize-sass.svg)](http://badge.fury.io/rb/materialize-sass)

`materialize-sass` is a Sass powered version of Materialize, a modern responsive front-end framework based on Material Design.

## Installation

In your Gemfile you need to add the `materialize-sass` gem:

```ruby
gem 'materialize-sass'
```

**NOTE:** Ensure that the `sass-rails` gem is presented in your Gemfile.

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

Since materialize color scheme are declared in _color.scss you should import the color.scss first. then you can override color variable just like this:

```scss
@import "materialize/components/color";
$primary-color: color("blue", "lighten-2") !default;
@import 'materialize';
```

or

You can import each component just like in this file below:
https://github.com/mkhairi/materialize-sass/blob/master/app/assets/stylesheets/materialize.scss

### b. JavaScript

Require Materialize javascripts in `app/assets/javascripts/application.js`:

```js
//= require jquery
//= require materialize-sprockets
```

## Contributing

1. Fork it ( https://github.com/[my-github-username]/materialize-sass/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

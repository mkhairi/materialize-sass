# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'materialize-sass/version'

Gem::Specification.new do |spec|
  spec.name          = "materialize-sass"
  spec.version       = Materialize::Sass::VERSION
  spec.authors       = ["mkhairi"]
  spec.email         = ["khairi@labs.my"]
  spec.summary       = %q{Materializecss rubygem for rails/sprockets base}
  spec.description   = %q{A modern responsive front-end framework based on Material Design. https://materializecss.com/}
  spec.homepage      = "https://github.com/mkhairi/materialize-sass"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  # development dependencies
  spec.add_development_dependency "bundler", ">= 2.2.10"
  spec.add_development_dependency "rake", ">= 12.3.3"

  #runtime dependencies
  spec.add_runtime_dependency 'autoprefixer-rails', '>= 6.0.3'
end

# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'materialize-sass/version'

Gem::Specification.new do |spec|
  spec.name          = "materialize-sass"
  spec.version       = Materialize::Sass::VERSION
  spec.authors       = ["mkhairi"]
  spec.email         = ["khairi@labs.my"]
  spec.summary       = %q{Materialzecss sass for rails.}
  spec.description   = %q{Use materialzecss in your rails asset pipeline.}
  spec.homepage      = "https://github.com/mkhairi/materialize-sass"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  # development dependencies
  spec.add_development_dependency "bundler", "~> 1.7"
  spec.add_development_dependency "rake", "~> 10.0"

  #runtime dependencies
  spec.add_runtime_dependency 'sass', '>= 3.5.2'
  spec.add_runtime_dependency 'autoprefixer-rails', '>= 6.0.3'
end

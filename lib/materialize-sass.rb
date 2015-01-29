require "materialize-sass/version"

module Materialize
  module Sass
    class Engine < ::Rails::Engine
      initializer 'bootstrap-sass.assets.precompile' do |app|
        %w(stylesheets javascripts fonts images).each do |sub|
          app.config.assets.paths << root.join('assets', sub).to_s
        end
        app.config.assets.precompile << %r(material-design-icons/Material-Design-Icons\.(?:eot|svg|ttf|woff2?)$)
        app.config.assets.precompile << %r(roboto/Roboto-Bold\.(?:eot|svg|ttf|woff2?)$)
      end
    end
  end
end

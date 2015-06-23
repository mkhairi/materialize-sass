module Materialize
  module Sass
    class Engine < ::Rails::Engine
      initializer 'materialize-sass.assets.precompile' do |app|
        %w(stylesheets javascripts fonts images).each do |sub|
          app.config.assets.paths << root.join('app/assets', sub).to_s
        end
        app.config.assets.precompile << %r(material-design-icons/Material-Design-Icons\.(?:eot|svg|ttf|woff|woff2?)$)
        app.config.assets.precompile << %r(roboto/Roboto-[\w-]+\.(?:eot|svg|ttf|woff|woff2?)$)
      end
    end
  end
end

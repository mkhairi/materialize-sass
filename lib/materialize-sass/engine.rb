require 'autoprefixer-rails'
require "materialize-sass/helpers"

module Materialize
  module Rails
    class Engine < ::Rails::Engine
      initializer 'materialize-sass.assets' do |app|
        %w(stylesheets javascripts).each do |sub|
          app.config.assets.paths << root.join('assets', sub).to_s
        end
        ActionController::Base.send(:helper, Materialize::Helpers)
      end
    end
  end
end

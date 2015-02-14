module SimpleFormMaterialize
  module Generators
    class InstallGenerator < Rails::Generators::Base
      desc "Copy SimpleForm default files"
      source_root File.expand_path('../templates', __FILE__)
      #class_option :template_engine, desc: 'Template engine to be invoked (erb, haml or slim).'

      def info_bootstrap
        #
      end

      def copy_config
        template "config/initializers/simple_form_materialize.rb"

        #directory 'config/locales'
      end

      def copy_scaffold_template
        engine = options[:template_engine] || "erb"
        copy_file "_form.html.#{engine}", "lib/templates/#{engine}/scaffold/_form.html.#{engine}"
      end

      def show_readme
        #readme "README"
      end
    end
  end
end

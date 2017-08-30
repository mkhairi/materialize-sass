require "bundler/gem_tasks"

source_dir = "materialize-src" 

namespace :javascripts do
  
  desc "Cleaning javascripts directory"
  task :clean do
   rm_rf "app/assets/javascripts/materialize"
  end
  
  desc "Copy #{source_dir}/dist/src/js"
  task :copy do
    src_dir = "#{source_dir}/dist/src/js/."
    tgt_dir = "app/assets/javascripts/materialize/"
    mkdir_p tgt_dir
    cp_r src_dir, tgt_dir
    cp "#{source_dir}/dist/js/materialize.js", "app/assets/javascripts"
  end
  
  ##todo
  # materialize-sprockets.js  

  desc "Copy #{source_dir}/extras/"
  task :copy_extras do
    src_dir = Dir.glob("#{source_dir}/extras/noUiSlider/*").reject { |file| file.end_with?(".css") }
    tgt_dir = "app/assets/javascripts/materialize/extras/"
    mkdir_p tgt_dir
    cp_r src_dir, tgt_dir
  end
  
  task :turbolinks_init do
    files =  Dir.glob('app/assets/javascripts/materialize/**/*.js').reject { |file| file.end_with?(".min.js") and File.file?(file) }
    files.each do |file|
      selected_files = %w(buttons.js cards.js character_counter.js chips.js collapsible.js 
                          dropdown.js forms.js materialbox.js scrollspy.js tabs.js tooltip.js transitions.js)
      file_name = File.basename file
      #only selected file
      if selected_files.include?(file_name)
        content = File.read(file)
        fixed_content = content.gsub("$(document).ready(", "$(document).on('ready turbolinks:load', ")
        File.open(file, "w") { |f| f.puts fixed_content}
      end
    end
  end 
  

  desc "Setup javascript assets"
  task setup: [:clean, :copy, :copy_extras, :turbolinks_init]
  #task setup: [:clean, :copy, :copy_extras]
end

namespace :stylesheets do
  desc "Cleaning stylesheets directory"
  task :clean do
   rm_rf "app/assets/stylesheets/materialize"
  end

  desc "Copy #{source_dir}/sass/"
  task :copy do
    src_dir = "#{source_dir}/sass/."
    tgt_dir = "app/assets/stylesheets/materialize/"
    mkdir_p tgt_dir
    cp_r src_dir, tgt_dir
    rm tgt_dir+"ghpages-materialize.scss"
    rm tgt_dir+"_style.scss"
    mv tgt_dir+"materialize.scss", "app/assets/stylesheets/"
  end

  desc "Copy #{source_dir}/extras/"
  task :copy_extras do
    src_dir = Dir.glob("#{source_dir}/extras/noUiSlider/*").reject { |file| file.end_with?(".js") }
    tgt_dir = "app/assets/stylesheets/materialize/extras/"
    mkdir_p tgt_dir
    cp_r src_dir, tgt_dir
  end
 
  desc "Fix url in stylesheets"
  task :fix_urls do
    Dir.glob('app/assets/stylesheets/**/*.scss').each do |file|
      content = File.read(file)
      fixed_content = content.gsub('url("#{$roboto-font-path}', 'font-url("#{$roboto-font-path}').gsub('url(\'#{$roboto-font-path}', 'font-url(\'#{$roboto-font-path}')
      File.open(file, "w") { |f| f.puts fixed_content}
    end
    #changes path
    file = "app/assets/stylesheets/materialize.scss"
    content = File.read(file)
    fixed_content = content.gsub(/components/, 'materialize/components')
    File.open(file, "w") { |f| f.puts fixed_content}


    file = "app/assets/stylesheets/materialize/components/_variables.scss"
    content = File.read(file)
    fixed_content = content.gsub(/..\/fonts\/roboto\//, 'roboto/')
    File.open(file, "w") { |f| f.puts fixed_content}


  end

  desc "Setup stylesheet assets"
  task setup: [:clean, :copy, :copy_extras, :fix_urls]
end

namespace :fonts do
  desc "Cleaning fonts directory"
  task :clean do
   rm_rf "app/assets/fonts"
  end

  desc "Copy #{source_dir}/fonts/"
  task :copy do
    src_dir = "#{source_dir}/fonts/."
    tgt_dir = "app/assets/fonts/"
    mkdir_p tgt_dir
    cp_r src_dir, tgt_dir
  end

  desc "Setup fonts assets"
  task setup: [:clean, :copy]
end

#desc "Remove minified file .min"
#task :cleanup do
#  Dir.glob('app/assets/**/*.min.*').each do |file|
#    rm file
#  end
#end

desc "Setup or update assets files"
task setup: ["javascripts:setup", "stylesheets:setup", "fonts:setup"]

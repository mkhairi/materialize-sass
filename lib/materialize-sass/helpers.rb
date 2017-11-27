module Materialize
  module Helpers

    def toaster
      valid_toast = ["error", "message", "success", "warning"]
      js_toast = ""
      queue = 0
      flash.each do |type, message|
        next if message.blank?
        type = type.to_s   
        case type   
        when "alert"
          type = "error"
        when "notice"
          type = "success"
        when "info"
          type = "message"
        end      
       next unless valid_toast.include?(type)         
        Array(message).each do |msg|
          js_toast << "setTimeout(function(){ M.toast({html: '#{j(msg)}'}) }, #{queue});"
        end
        queue += 100
      end    
      flash.clear
      return js_toast.html_safe()
    end
    
    def toast     
      jsReturn = javascript_tag(toaster)
    end
    
    def toast_now
      toaster
    end

  end
end
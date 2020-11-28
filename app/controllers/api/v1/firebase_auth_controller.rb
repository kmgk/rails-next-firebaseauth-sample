module Api
  module V1
    class FirebaseAuthController < ApplicationController
      include FirebaseAuthConcern

      def index
        hoge
      end
    end
  end
end

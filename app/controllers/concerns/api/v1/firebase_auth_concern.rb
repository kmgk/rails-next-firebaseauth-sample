module Api
  module V1
    module FirebaseAuthConcern
      extend ActiveSupport::Concern

      def hoge
        render json: { a: 'hoge' }
      end
    end
  end
end

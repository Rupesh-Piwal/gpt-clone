import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* SignIn Component with Custom Styling */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-none bg-transparent p-0",
                headerTitle:
                  "text-2xl font-bold text-gray-900 text-center mb-2",
                headerSubtitle: "text-gray-600 text-center mb-6",
                socialButtonsBlockButton:
                  "border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200 rounded-lg h-12",
                socialButtonsBlockButtonText: "font-medium text-gray-700",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-500 font-medium",
                formFieldInput:
                  "border-2 border-gray-200 focus:border-indigo-500 rounded-lg h-12 transition-colors duration-200",
                formFieldLabel: "text-gray-700 font-medium",
                formButtonPrimary:
                  "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg h-12 font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
                footerActionLink:
                  "text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200",
                identityPreviewText: "text-gray-700",
                identityPreviewEditButton:
                  "text-indigo-600 hover:text-indigo-700",
              },
            }}
            routing="hash"
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    </div>
  );
}

import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { ChatBot } from "@/components/ChatBot";
import { ConsentBanner } from "@/components/ConsentBanner";
import { usePageTracking } from "@/lib/useTracker";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Enquiry from "@/pages/Enquiry";
import Programs from "@/pages/Programs";
import DynamicPage from "@/pages/DynamicPage";
import AdminAnalytics from "@/pages/AdminAnalytics";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

// Inner component so it has access to wouter's location context
function TrackedRouter() {
  usePageTracking();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/admission/enquiry" component={Enquiry} />
      <Route path="/programs" component={Programs} />
      <Route path="/admin/analytics" component={AdminAnalytics} />
      <Route path="/:category/:slug">
        {() => <DynamicPage />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <TrackedRouter />
            <ChatBot />
            <ConsentBanner />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

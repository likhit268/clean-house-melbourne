# ==========================================================================
# PowerShell Static File Web Server for Clean House Melbourne Redesign
# Serves content on http://localhost:3000
# ==========================================================================

$port = 3000
$basePath = "C:\Users\DELL\.gemini\antigravity\scratch\clean-house-melbourne"

# Start Listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "Web server started on http://localhost:$port/" -ForegroundColor Green
    Write-Host "Serving files from: $basePath" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C in terminal (or kill task) to stop the server." -ForegroundColor Yellow

    # Launch browser automatically
    Start-Process "http://localhost:$port/"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Clean requested path
        $rawUrl = $request.RawUrl
        # Strip query parameters if any
        if ($rawUrl -match '\?') {
            $rawUrl = $rawUrl -split '\?' | Select-Object -First 1
        }
        
        # Default to index.html
        if ($rawUrl -eq "/" -or $rawUrl -eq "") {
            $rawUrl = "/index.html"
        }

        # Replace forward slashes with backslashes for Windows path resolution
        $relPath = $rawUrl.Replace("/", "\").TrimStart("\")
        $filePath = Join-Path $basePath $relPath

        if (Test-Path $filePath -PathType Leaf) {
            # Determine Content Type
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "application/octet-stream"

            switch ($ext) {
                ".html" { $contentType = "text/html; charset=utf-8" }
                ".css"  { $contentType = "text/css" }
                ".js"   { $contentType = "text/javascript" }
                ".jpg"  { $contentType = "image/jpeg" }
                ".jpeg" { $contentType = "image/jpeg" }
                ".png"  { $contentType = "image/png" }
                ".svg"  { $contentType = "image/svg+xml" }
                ".ico"  { $contentType = "image/x-icon" }
            }

            $response.ContentType = $contentType
            
            # Read and write file contents
            [byte[]]$bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            # File Not Found
            $response.StatusCode = 404
            [byte[]]$errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found: $rawUrl")
            $response.ContentType = "text/plain"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }

        $response.Close()
    }
} catch {
    Write-Error $_
} finally {
    $listener.Stop()
}

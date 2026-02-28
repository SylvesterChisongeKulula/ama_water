<template>
    <EHtml lang="en">
        <EHead />
        <EPreview>Reset your AMA Water admin password</EPreview>
        <EBody :style="main">
            <EContainer :style="container">
                <EImg src="https://amawater.com/logo.png" width="150" alt="AMA Water" :style="logo" />
                <ESection :style="section">
                    <EText :style="heading">Password Reset Request</EText>
                    <EText :style="text">
                        Hello {{ name }},
                    </EText>
                    <EText :style="text">
                        We received a request to reset your admin password for AMA Water. If you made this request,
                        click the button below to set a new password. This link will expire in 1 hour.
                    </EText>
                    <EButton :style="button" :href="resetLink">
                        Reset Password
                    </EButton>
                    <EText :style="text">
                        If you did not request a password reset, you can safely ignore this email. Your password will
                        remain unchanged.
                    </EText>
                </ESection>
                <EText :style="footer">
                    This is an automated message from AMA Water. Please do not reply to this email.
                </EText>
            </EContainer>
        </EBody>
    </EHtml>
</template>

<script setup lang="ts">
defineProps<{
    name: string
    resetLink: string
}>()

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
}

const logo = {
    margin: '0 auto',
    marginBottom: '24px',
}

const section = {
    padding: '0 48px',
}

const heading = {
    fontSize: '24px',
    letterSpacing: '-0.5px',
    lineHeight: '1.3',
    fontWeight: '600',
    color: '#0f172a',
    padding: '17px 0 0',
}

const text = {
    color: '#475569',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'left' as const,
    marginBottom: '16px'
}

const button = {
    backgroundColor: '#0ea5e9',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '100%',
    padding: '12px',
    margin: '24px 0',
}

const footer = {
    color: '#94a3b8',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '0 48px',
    marginTop: '24px',
    textAlign: 'center' as const,
}
</script>
